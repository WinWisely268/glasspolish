package common

import (
	"context"
	"errors"
	cip "github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider/types"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
)

var (
	hardLimit     = int32(3)
	AllowedGroups = []string{"guests", "users", "admins", "supers"}
)

func GetUserPrimaryGroup(userPoolID, username string, client *cip.Client) (*types.GroupType, error) {
	userAdminListInput := &cip.AdminListGroupsForUserInput{
		Limit:      &hardLimit,
		UserPoolId: &userPoolID,
		Username:   &username,
	}
	ctx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()
	userGroups, err := client.AdminListGroupsForUser(ctx, userAdminListInput)
	if err != nil {
		return nil, err
	}
	if len(userGroups.Groups) == 0 {
		return nil, errors.New("user has no role, forbid from login")
	}
	return &userGroups.Groups[0], nil
}

func GetUser(userPoolID, username string, client *cip.Client) (*cip.AdminGetUserOutput, error) {
	ctx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()
	return client.AdminGetUser(ctx, &cip.AdminGetUserInput{
		UserPoolId: &userPoolID,
		Username:   &username,
	})
}
