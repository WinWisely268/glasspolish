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
	delAPI *api.API
)

func init() {
	newCfg := config.InitConfig()
	delAPI = api.NewAPI(newCfg)
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body models.HasuraEvent
	if err := json.Unmarshal([]byte(request.Body), &body); err != nil {
		log.WithFields(log.Fields{
			"API":         "DeleteAccount",
			"requestBody": request.Body,
		}).Error(err)
		return resp.RenderInternalErr(err)
	}
	delResp, err := delAPI.DeleteUserAccount(&body.Event)
	if err != nil {
		log.WithFields(log.Fields{
			"API":   "DeleteAccount",
			"event": body.Event.Old,
		}).Error(err)
		return resp.RenderInternalErr(err)
	}
	return resp.RenderOK(delResp)
}

func main() {
	lambda.Start(Handler)
}
