package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/winwisely268/glasspolish-triggers/pkg/api"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
)

var (
	postAuthApi *api.API
)

func init() {
	newCfg := config.InitConfig()
	postAuthApi = api.NewAPI(newCfg)
}

func main() {
	lambda.Start(postAuthApi.HandlePostAuth)
}
