package imgapi

import (
	"fmt"
	"github.com/aws/aws-sdk-go-v2/feature/cloudfront/sign"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"github.com/winwisely268/glasspolish-triggers/pkg/secret"
	"github.com/winwisely268/glasspolish-triggers/pkg/wrapper"
	"net/url"
	"strings"
)

type DownloadSvc struct {
	*wrapper.CloudFrontAPI
}

func NewDownloadSvc(cfg *config.APIConfig) (*DownloadSvc, error) {
	ssmApi := secret.NewSsmAPI(cfg)
	cfConfig, err := createCFConfig(ssmApi)
	if err != nil {
		return nil, err
	}
	cfApi := wrapper.NewCloudFrontAPI(cfg, cfConfig)
	return &DownloadSvc{
		cfApi,
	}, nil
}

func (d *DownloadSvc) GetDownloadURL(req *models.DownloadURLRequest) (*models.DownloadURLResponse, error) {
	u := &url.URL{
		Scheme: req.Scheme,
		Host:   req.Domain,
		Path:   fmt.Sprintf("%s%s%s%s", constants.ImageDir, req.Prefix, "/", req.File),
	}
	r := &wrapper.CFSignURLRequest{
		URL: u.String(),
		TTL: constants.CFSignedURLTTL,
	}

	uri, err := d.GetSignURL(r)
	if err != nil {
		return nil, err
	}

	return &models.DownloadURLResponse{
		URL: uri,
	}, nil
}

func createCFConfig(ssmClient *secret.SsmAPI) (*wrapper.CloudFrontConfig, error) {
	chErr := ""
	pkCh := make(chan string, 1)
	go func() {
		pkStr, err := ssmClient.GetDecryptedParameter(constants.SSMPrivateKey)
		if err != nil {
			log.WithFields(log.Fields{
				"param": constants.SSMPrivateKey,
				"error": err,
			}).Error("Creating CloudFront Config: GetDecryptedParameter error")
			pkCh <- chErr
		} else {
			pkCh <- pkStr
		}
		close(pkCh)
	}()

	idCh := make(chan string)
	go func() {
		kid, err := ssmClient.GetParameter(constants.SSMKeyId)
		if err != nil {
			log.WithFields(log.Fields{
				"param": constants.SSMKeyId,
				"error": err,
			}).Error("Creating CloudFront Config: GetParameter error")
			idCh <- chErr
		} else {
			idCh <- kid
		}
	}()
	pkStr := <-pkCh
	keyID := <-idCh

	if pkStr == chErr {
		return nil, errors.Errorf("Getting SSM Parameter %s failed", constants.SSMPrivateKey)
	}
	if keyID == chErr {
		return nil, errors.Errorf("Getting SSM Parameter %s failed", constants.SSMKeyId)
	}

	pk, err := sign.LoadPEMPrivKey(strings.NewReader(pkStr))
	if err != nil {
		return nil, err
	}
	return &wrapper.CloudFrontConfig{
		KeyID:      keyID,
		PrivateKey: pk,
	}, nil
}
