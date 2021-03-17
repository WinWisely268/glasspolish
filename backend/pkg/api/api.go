package api

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
	"github.com/winwisely268/glasspolish-triggers/pkg/secret"
	"time"

	"github.com/aws/aws-lambda-go/events"
	cip "github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
	"github.com/google/uuid"
	"github.com/machinebox/graphql"
	log "github.com/sirupsen/logrus"

	"github.com/winwisely268/glasspolish-triggers/pkg/common"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
)

type API struct {
	CognitoClient *cip.Client
	secApi        *secret.SsmAPI
	userPoolId    string
}

func NewAPI(cfg *config.APIConfig) *API {
	secApi := secret.NewSsmAPI(cfg)
	userPoolId, _ := secApi.GetDecryptedParameter(constants.UserPoolId)
	client := cip.NewFromConfig(cfg.AWSCfg)
	return &API{
		client,
		secApi,
		userPoolId,
	}
}

func (a *API) DisableUserAccount(event *models.Event) (*cip.AdminDisableUserOutput, error) {
	accTables, err := event.ToAccountTables()
	if err != nil {
		return nil, err
	}
	userDeletionParam := cip.AdminDisableUserInput{
		UserPoolId: &a.userPoolId,
		Username:   &accTables[0].UserID,
	}
	newCtx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()
	return a.CognitoClient.AdminDisableUser(newCtx, &userDeletionParam)
}

func (a *API) DeleteUserAccount(event *models.Event) (*cip.AdminDeleteUserOutput, error) {
	accTables, err := event.ToAccountTables()
	if err != nil {
		return nil, err
	}
	userDeletionParam := cip.AdminDeleteUserInput{
		UserPoolId: &a.userPoolId,
		Username:   &accTables[0].UserID,
	}
	newCtx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()
	return a.CognitoClient.AdminDeleteUser(newCtx, &userDeletionParam)
}

func (a *API) AddUserToDefaultGroup(event *events.CognitoEventUserPoolsPostConfirmation) (*cip.AdminAddUserToGroupOutput, error) {
	userAddToGroupInput := &cip.AdminAddUserToGroupInput{
		GroupName:  aws.String("users"),
		UserPoolId: &event.UserPoolID,
		Username:   &event.UserName,
	}
	newCtx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()
	return a.CognitoClient.AdminAddUserToGroup(newCtx, userAddToGroupInput)
}

func (a *API) UpdateUserRole(event *models.Event) (*cip.AdminAddUserToGroupOutput, error) {
	accTables, err := event.ToAccountTables()
	if err != nil {
		return nil, err
	}
	if len(accTables) == 0 {
		log.WithFields(log.Fields{
			"user": event,
			"err":  "already in the group",
		})
		return &cip.AdminAddUserToGroupOutput{}, nil
	}
	userDeleteCurrentGroupParam := cip.AdminRemoveUserFromGroupInput{
		GroupName:  &accTables[0].Role,
		UserPoolId: &a.userPoolId,
		Username:   &accTables[0].UserID,
	}
	newCtx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()
	_, err = a.CognitoClient.AdminRemoveUserFromGroup(newCtx, &userDeleteCurrentGroupParam)
	if err != nil {
		return nil, err
	}
	userAddToGroupParam := cip.AdminAddUserToGroupInput{
		GroupName:  &accTables[1].Role,
		UserPoolId: &a.userPoolId,
		Username:   &accTables[1].UserID,
	}
	newCtx, cancel = context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()
	return a.CognitoClient.AdminAddUserToGroup(newCtx, &userAddToGroupParam)
}

func (a *API) AddClaimHandler(event events.CognitoEventUserPoolsPreTokenGen) (events.CognitoEventUserPoolsPreTokenGen, error) {
	userGroup, err := common.GetUserPrimaryGroup(event.UserPoolID, event.UserName, a.CognitoClient)
	if err != nil {
		return event, err
	}
	addedClaims := map[string]interface{}{
		"x-hasura-allowed-roles": common.AllowedGroups,
		"x-hasura-user-id":       event.Request.UserAttributes["sub"],
		"x-hasura-role":          userGroup.GroupName,
		"x-hasura-default-role":  userGroup.GroupName,
	}
	res, err := json.Marshal(addedClaims)
	if err != nil {
		return event, err
	}
	event.Response.ClaimsOverrideDetails.ClaimsToAddOrOverride = map[string]string{
		"https://hasura.io/jwt/claims": string(res),
	}
	return event, nil
}

func (a *API) HandlePostAuth(ctx context.Context, event events.CognitoEventUserPoolsPostAuthentication) (events.CognitoEventUserPoolsPostAuthentication, error) {
	userGroup, err := common.GetUserPrimaryGroup(event.UserPoolID, event.UserName, a.CognitoClient)
	if err != nil {
		return event, err
	}
	endpoint, err := a.secApi.GetDecryptedParameter(constants.HasuraEndpoint)
	if err != nil {
		return events.CognitoEventUserPoolsPostAuthentication{}, err
	}
	gclient := graphql.NewClient(endpoint)
	upsertUserReq := graphql.NewRequest(`
    mutation($userId: uuid!, $userGroup: String!, $userEmail: String!){
      insert_accounts(objects: [{ user_id: $userId, role: $userGroup, email: $userEmail}],
      on_conflict: { constraint: accounts_pkey, update_columns: [] }) {
        affected_rows
      }
	}`)
	userId, err := uuid.Parse(event.Request.UserAttributes["sub"])
	if err != nil {
		return event, err
	}
	upsertUserReq.Var("userId", userId)
	fmt.Println(event.Request.UserAttributes["sub"])
	upsertUserReq.Var("userEmail", event.Request.UserAttributes["email"])
	fmt.Println(event.Request.UserAttributes["email"])
	upsertUserReq.Var("userGroup", userGroup.GroupName)
	fmt.Println(userGroup.GroupName)
	adminSec, err := a.secApi.GetDecryptedParameter(constants.HasuraAdminSecret)
	if err != nil {
		return events.CognitoEventUserPoolsPostAuthentication{}, err
	}
	upsertUserReq.Header.Set("x-hasura-admin-secret", adminSec)
	ctxTimeout, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	var resp map[string]interface{}
	if err = gclient.Run(ctxTimeout, upsertUserReq, &resp); err != nil {
		return event, err
	}
	return event, nil
}
