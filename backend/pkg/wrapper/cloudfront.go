package wrapper

import (
	"crypto/rsa"
	"github.com/aws/aws-sdk-go-v2/feature/cloudfront/sign"
	"github.com/aws/aws-sdk-go-v2/service/cloudfront"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"time"
)

func NewCloudFrontAPI(cfg *config.APIConfig, ccfg *CloudFrontConfig) *CloudFrontAPI {

	client := cloudfront.NewFromConfig(cfg.AWSCfg)

	return &CloudFrontAPI{
		cfg:    ccfg,
		client: client,
	}
}

type CFSignURLRequest struct {
	URL string
	TTL time.Duration
}

type CloudFrontConfig struct {
	KeyID      string
	PrivateKey *rsa.PrivateKey
}

type HasuraSSMConfig struct {
	HasuraEndpoint    string
	HasuraAdminSecret string
}

type CloudFrontAPI struct {
	cfg    *CloudFrontConfig
	client *cloudfront.Client
}

func (api *CloudFrontAPI) GetSignURL(reqData *CFSignURLRequest) (string, error) {

	signer := sign.NewURLSigner(api.cfg.KeyID, api.cfg.PrivateKey)

	return signer.Sign(reqData.URL, time.Now().UTC().Add(reqData.TTL))
}
