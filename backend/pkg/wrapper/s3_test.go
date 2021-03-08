package wrapper_test

import (
	"github.com/stretchr/testify/require"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/wrapper"
	"os"
	"testing"
	"time"
)

func TestGetPutObjectPreSignURL(t *testing.T) {
	meta := map[string]string{
		"width":  "800",
		"height": "600",
	}
	reqData := &wrapper.S3PreSignURLRequest{
		Bucket:      os.Getenv("AWS_S3_BUCKET"),
		Key:         "resize/test.jpg",
		ContentType: "image/jpg",
		Metadata:    meta,
		TTL:         10 * time.Minute,
	}
	s3Api := wrapper.NewS3Api(config.InitConfig())
	signedUrl, err := s3Api.GetPutObjectPreSignURL(reqData)
	require.NoError(t, err)
	require.NotEqual(t, "", signedUrl)
}

func TestPutObject(t *testing.T) {

	image, err := os.Open("../../../scrotie.png")
	if err != nil {
		t.Fatalf("OpenFile failed: %v", err)
	}

	bucket := os.Getenv("AWS_S3_BUCKET")
	key := "resize/test.jpg"
	contentType := "image/jpg"

	metadata := map[string]string{
		"width":  "1024",
		"height": "594",
	}

	s3Api := wrapper.NewS3Api(config.InitConfig())

	resp, err := s3Api.PutObject(image, bucket, key, contentType, metadata)
	require.NoError(t, err)
	require.NotEqual(t, nil, resp)
}
