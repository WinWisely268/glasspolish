package imgapi

import (
	"fmt"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"github.com/winwisely268/glasspolish-triggers/pkg/wrapper"
	"strconv"
	"strings"
)

type UploadSvc struct {
	*wrapper.S3Api
}

func NewUploadSvc(cfg *config.APIConfig) (*UploadSvc, error) {
	return &UploadSvc{wrapper.NewS3Api(cfg)}, nil
}

func (u *UploadSvc) UploadURL(req *models.UploadURLRequest) (*models.UploadURLResponse, error) {
	metadata := map[string]string{}
	width := req.Width
	if width > 0 {
		metadata["width"] = strconv.FormatInt(width, 10)
	}
	height := req.Height
	if height > 0 {
		metadata["height"] = strconv.FormatInt(height, 10)
	}

	key := fmt.Sprintf("%s%s%s%s", constants.ImageDir, req.Prefix, "/", req.File)

	presignedReq := &wrapper.S3PreSignURLRequest{
		Bucket:      req.Bucket,
		Key:         key,
		ContentType: req.ContentType,
		Metadata:    metadata,
		TTL:         constants.TTLS3PresignedURL,
	}

	url, headers, err := u.S3Api.GetPutObjectPreSignURLHeaders(presignedReq)
	if err != nil {
		return nil, err
	}
	rtHeaders := map[string]string{}
	for name, vals := range *headers {
		value := strings.Join(vals, ",")
		rtHeaders[name] = value
	}

	return &models.UploadURLResponse{
		URL:     url,
		Headers: rtHeaders,
	}, nil
}
