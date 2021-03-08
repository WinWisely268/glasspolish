package wrapper

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
	"io"
	"net/http"
	"time"
)

type S3Api struct {
	client *s3.Client
}

func NewS3Api(cfg *config.APIConfig) *S3Api {
	client := s3.NewFromConfig(cfg.AWSCfg)
	return &S3Api{client: client}
}

type S3PreSignURLRequest struct {
	Bucket      string
	Key         string
	ContentType string
	Metadata    map[string]string
	TTL         time.Duration
}

func (api *S3Api) GetPutObjectPreSignURL(reqData *S3PreSignURLRequest) (string, error) {
	input := &s3.PutObjectInput{
		Bucket:      aws.String(reqData.Bucket),
		Key:         aws.String(reqData.Key),
		ContentType: aws.String(reqData.ContentType),
		Metadata:    reqData.Metadata,
	}

	ctx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()

	psClient := s3.NewPresignClient(api.client)
	resp, err := psClient.PresignPutObject(ctx, input)
	if err != nil {
		return "", err
	}
	return resp.URL, nil
}

func (api *S3Api) GetPutObjectPreSignURLHeaders(reqData *S3PreSignURLRequest) (string, *http.Header, error) {
	input := &s3.PutObjectInput{
		Bucket:      aws.String(reqData.Bucket),
		Key:         aws.String(reqData.Key),
		ContentType: aws.String(reqData.ContentType),
		Metadata:    reqData.Metadata,
	}

	ctx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()

	psClient := s3.NewPresignClient(api.client)
	resp, err := psClient.PresignPutObject(ctx, input)
	if err != nil {
		return "", nil, err
	}
	return resp.URL, &resp.SignedHeader, nil
}

func (api *S3Api) GetObject(bucket, key string) (*s3.GetObjectOutput, error) {

	input := &s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	}

	ctx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()

	return api.client.GetObject(ctx, input)
}

func (api *S3Api) PutObject(body io.Reader, bucket, key, contentType string, metadata map[string]string) (*s3.PutObjectOutput, error) {

	input := &s3.PutObjectInput{
		Body:        body,
		Bucket:      aws.String(bucket),
		Key:         aws.String(key),
		ContentType: aws.String(contentType),
		Metadata:    metadata,
	}

	ctx, cancel := context.WithTimeout(context.Background(), constants.ContextTimeoutSeconds)
	defer cancel()

	return api.client.PutObject(ctx, input)
}
