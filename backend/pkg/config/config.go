package config

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/aws"
	cfg "github.com/aws/aws-sdk-go-v2/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
	"log"
	"os"
)

type APIConfig struct {
	AWSCfg     aws.Config
	HGEndpoint string
}

func InitConfig() *APIConfig {
	region := os.Getenv("GLASSPOLISH_API_AWS_REGION")
	if region == "" {
		region = constants.DefaultRegion
	}
	hasuraEndpoint := os.Getenv("GLASSPOLISH_API_HGE_ENDPOINT")
	if hasuraEndpoint == "" {
		hasuraEndpoint = constants.DefaultGraphQLEndpoint
	}
	awsCfg, err := cfg.LoadDefaultConfig(context.TODO(), cfg.WithDefaultRegion(region))
	if err != nil {
		log.Fatalf("failed to load config: %v\n", err.Error())
	}
	return &APIConfig{
		awsCfg,
		hasuraEndpoint,
	}
}
