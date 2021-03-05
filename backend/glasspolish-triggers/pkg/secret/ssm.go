package secret

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/service/ssm"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
)

func NewSsmAPI(cfg *config.APIConfig) *SsmAPI {
	client := ssm.NewFromConfig(cfg.AWSCfg)
	return &SsmAPI{
		client: client,
	}
}

type SsmAPI struct {
	client *ssm.Client
}

func (api *SsmAPI) GetParameter(name string) (string, error) {
	input := &ssm.GetParameterInput{
		Name: &name,
	}
	resp, err := api.client.GetParameter(context.Background(), input)
	if err != nil {
		return "", err
	}
	return *resp.Parameter.Value, nil
}

func (api *SsmAPI) GetDecryptedParameter(name string) (string, error) {
	input := &ssm.GetParameterInput{
		Name:           &name,
		WithDecryption: true,
	}
	resp, err := api.client.GetParameter(context.Background(), input)
	if err != nil {
		return "", err
	}
	return *resp.Parameter.Value, nil
}

func (api *SsmAPI) GetParameters(names ...string) (map[string]string, error) {
	ctx, cancelFn := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancelFn()
	input := &ssm.GetParametersInput{
		Names: names,
	}

	resp, err := api.client.GetParameters(ctx, input)
	if err != nil {
		return nil, err
	}

	result := map[string]string{}
	for _, param := range resp.Parameters {
		result[*param.Name] = *param.Value
	}
	return result, nil
}
