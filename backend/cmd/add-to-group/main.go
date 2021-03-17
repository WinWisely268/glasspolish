package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/winwisely268/glasspolish-triggers/pkg/api"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
)

var (
	addToGroupApi *api.API
)

func init() {
	newCfg := config.InitConfig()
	addToGroupApi = api.NewAPI(newCfg)
}

func main() {
	lambda.Start(addToGroupApi.AddUserToDefaultGroup)
}
