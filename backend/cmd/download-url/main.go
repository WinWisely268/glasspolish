package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	log "github.com/sirupsen/logrus"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/imgapi"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"github.com/winwisely268/glasspolish-triggers/pkg/render"
	"os"
)

var cfDomain string
var downloadSvc *imgapi.DownloadSvc

func init() {
	cfDomain = os.Getenv("CF_DOMAIN_NAME")
	newDownloadSvc, err := imgapi.NewDownloadSvc(config.InitConfig())
	if err != nil {
		log.Fatalf("error creating download service: %v\n", err)
	}
	downloadSvc = newDownloadSvc
}

func dlHandler(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	reqBody := &models.DownloadURLRequest{}
	err := render.ParseReqBody(req, reqBody)
	if err != nil {
		return render.RenderBadRequest(err)
	}
	log.WithFields(log.Fields{
		"file": reqBody.File,
	}).Info("Download Handler: Get download URL request")
	reqBody.Scheme = "https"
	reqBody.Domain = cfDomain

	renderData, err := downloadSvc.GetDownloadURL(reqBody)
	if err != nil {
		return render.RenderInternalErr(err)
	}
	return render.RenderOK(renderData)
}

func main() {
	lambda.Start(dlHandler)
}
