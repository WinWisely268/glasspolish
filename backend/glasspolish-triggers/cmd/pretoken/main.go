package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/winwisely268/glasspolish-triggers/pkg/api"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
)

var (
	pretokenApi *api.API
)

func init() {
	newCfg := config.InitConfig()
	pretokenApi = api.NewAPI(newCfg)
}

func main() {
	lambda.Start(pretokenApi.AddClaimHandler)
}
