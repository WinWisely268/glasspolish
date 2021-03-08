package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	log "github.com/sirupsen/logrus"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/imgapi"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"time"
)

var resizeSvc *imgapi.ResizeSvc
var err error

func init() {
	resizeSvc, err = imgapi.NewResizeSvc(config.InitConfig())
}

func resizeHandler(_ context.Context, s3Event events.S3Event) {
	if err != nil {
		log.WithFields(
			log.Fields{
				"function": "Resize Handler",
				"error":    err,
			},
		).Error(err)
	}
	for _, record := range s3Event.Records {

		s3 := record.S3
		bucket := s3.Bucket.Name
		key := s3.Object.Key
		lastHundredSeconds := time.Now().UTC().Unix() - 100

		if record.EventName == "ObjectCreated:Put" {
			if record.EventTime.UTC().Unix() >= lastHundredSeconds {
				log.WithFields(
					log.Fields{
						"source": record.EventSource,
						"event":  record.EventName,
						"time":   record.EventTime.UTC().Unix(),
						"bucket": bucket,
						"key":    key,
					},
				).Info("Resize Handler: S3 event record")

				pf, err := models.ToPrefix(key)
				if err != nil {
					log.WithFields(
						log.Fields{
							"source":    record.EventSource,
							"eventTime": record.EventTime.UTC(),
							"eventName": record.EventName,
							"bucket":    bucket,
							"prefix":    pf,
						},
					).Error(err)
					return
				}

				if err = resizeSvc.ResizeImg(bucket, key, pf); err != nil {
					log.WithFields(
						log.Fields{
							"error": err,
						},
					).Error("Resize Handler: Resizing image failed")
					return
				}
			} else {
				return
			}
		} else {
			return
		}

	}
}

func main() {
	lambda.Start(resizeHandler)
}
