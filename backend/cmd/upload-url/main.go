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

var bucket string
var uploadSvc *imgapi.UploadSvc
var errInit error

func init() {
	bucket = os.Getenv("AWS_S3_BUCKET")
	uploadSvc, errInit = imgapi.NewUploadSvc(config.InitConfig())
	if errInit != nil {
		log.Panic(errInit)
	}
}

func uploadHandler(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	reqData := &models.UploadURLRequest{}
	err := render.ParseReqBody(req, reqData)
	if err != nil {
		return render.RenderBadRequest(err)
	}

	log.WithFields(
		log.Fields{
			"file":        reqData.File,
			"contentType": reqData.ContentType,
			"width":       reqData.Width,
			"height":      reqData.Height,
		},
	).Info("Upload Handler: Request presigned upload URL")

	reqData.Bucket = bucket
	respData, err := uploadSvc.UploadURL(reqData)
	if err != nil {
		return render.RenderInternalErr(err)
	}
	return render.RenderOK(respData)
}

func main() {
	lambda.Start(uploadHandler)
}
