package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	log "github.com/sirupsen/logrus"
	"github.com/winwisely268/glasspolish-triggers/pkg/api"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	resp "github.com/winwisely268/glasspolish-triggers/pkg/render"
)

var (
	updAPI *api.API
)

func init() {
	newCfg := config.InitConfig()
	updAPI = api.NewAPI(newCfg)
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body models.HasuraEvent
	if err := json.Unmarshal([]byte(request.Body), &body); err != nil {
		log.WithFields(log.Fields{
			"API":         "UpdateAccountRole",
			"requestBody": request.Body,
		})
		return resp.RenderInternalErr(err)
	}
	updResp, err := updAPI.UpdateUserRole(&body.Event)
	if err != nil {
		log.WithFields(log.Fields{
			"API": "UpdateAccountRole",
			"old": body.Event.Old,
			"new": body.Event.New,
		}).Error(err)
		return resp.RenderBadRequest(err)
	}
	return resp.RenderOK(updResp)
}

func main() {
	lambda.Start(Handler)
}
