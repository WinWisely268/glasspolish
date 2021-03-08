package imgapi

import (
	"bytes"
	"context"
	"github.com/anthonynsimon/bild/imgio"
	"github.com/anthonynsimon/bild/transform"
	"github.com/machinebox/graphql"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/constants"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"github.com/winwisely268/glasspolish-triggers/pkg/secret"
	"github.com/winwisely268/glasspolish-triggers/pkg/wrapper"
	"image"
	"io"
	"strconv"
	"strings"
)

type ResizeSvc struct {
	*wrapper.S3Api
	Cfg *wrapper.HasuraSSMConfig
}

func NewResizeSvc(cfg *config.APIConfig) (*ResizeSvc, error) {
	ssmApi := secret.NewSsmAPI(cfg)
	hsCfg, err := loadHasuraConfig(ssmApi)
	if err != nil {
		return nil, err
	}
	return &ResizeSvc{
		wrapper.NewS3Api(cfg),
		hsCfg,
	}, nil
}

func (r *ResizeSvc) ResizeImg(bucket, key string, pf *models.Prefix) error {
	object, err := r.GetObject(bucket, key)
	if err != nil {
		return err
	}

	md := object.Metadata
	log.WithFields(log.Fields{
		"key":      key,
		"metadata": md,
	}).Info("ResizeSvc: GetObject")

	var contentType, imgType string
	if object.ContentType != nil {
		contentType = *object.ContentType
		contentAttr := strings.Split(contentType, "/")
		imgType = contentAttr[len(contentAttr)-1]
	}

	if imgType == "" {
		return errors.Errorf("ResizeSvc: bucket %s doesn't have valid content type for key: %s => %s\n",
			bucket, key, imgType)
	}
	resWidth := 0
	resHeight := 0
	if width := md["Width"]; width != "" {
		if w, err := strconv.Atoi(width); err == nil {
			resWidth = w
		}
	}
	if height := md["Height"]; height != "" {
		if h, err := strconv.Atoi(height); err == nil {
			resHeight = h
		}
	}

	if resWidth <= 0 && resHeight <= 0 {
		log.WithFields(log.Fields{
			"bucket": bucket,
			"key":    key,
			"width":  resWidth,
			"height": resHeight,
		}).Info("resize operation aborted, not needed")
	}

	resizedImg, err := r.Resize(object.Body, imgType, resWidth, resHeight)
	if err != nil {
		return err
	}

	key = strings.Replace(key, constants.ImageDir, constants.ResizedDir, 1)
	log.WithFields(log.Fields{"key": key}).Info("ResizeSvc: new object key")

	if _, err = r.S3Api.PutObject(bytes.NewReader(resizedImg), bucket, key, contentType, md); err != nil {
		return err
	}
	errCh := make(chan error, 1)

	go func() {
		log.WithField("prefix", pf.ToString()).Info("prefix")
		gclient := graphql.NewClient(r.Cfg.HasuraEndpoint)
		query, err := pf.GenerateMutationQuery()
		if err != nil {
			log.WithFields(log.Fields{
				"function": "Resize Image Function",
				"error":    err,
			}).Error("Updating Hasura error")
			errCh <- err
		}
		if query == nil || query.Header == nil {
			log.WithFields(log.Fields{
				"function": "Resize Image Function",
				"query":    query,
			}).Error("Updating Hasura error")
			errCh <- err
		}
		query.Header.Set("X-Hasura-Admin-Secret", r.Cfg.HasuraAdminSecret)
		ctxTimeout, cancel := context.WithTimeout(context.Background(), constants.HasuraTimeout)
		defer cancel()
		if err = gclient.Run(ctxTimeout, query, nil); err != nil {
			log.WithFields(log.Fields{
				"function": "Resize Image Function",
				"error":    err,
			}).Error("Updating Hasura error")
			errCh <- err
		}
		errCh <- nil
	}()

	if err = <-errCh; err != nil {
		return err
	}

	return nil
}

func Resize(content io.Reader, imgType string, w, h int) ([]byte, error) {
	buf := &bytes.Buffer{}
	img, _, err := image.Decode(content)
	if err != nil {
		return nil, err
	}
	log.WithFields(log.Fields{
		"Image Extension": imgType,
	}).Info("Image extension")
	resized := transform.Resize(img, w, h, transform.NearestNeighbor)
	ext := strings.ToLower(strings.Trim(imgType, "\t\n "))
	log.WithFields(log.Fields{
		"Image Extension": imgType,
		"extension":       ext,
	}).Info("ImgType")
	switch ext {
	case "png":
		err = imgio.PNGEncoder()(buf, resized)
	case "jpg", "jpeg":
		err = imgio.JPEGEncoder(80)(buf, resized)
	case "tiff", "bmp":
		err = imgio.BMPEncoder()(buf, resized)
	default:
		return nil, errors.New("invalid format is specified")
	}
	return buf.Bytes(), err
}

func (r *ResizeSvc) Resize(content io.Reader, imgType string, w, h int) ([]byte, error) {
	buf := &bytes.Buffer{}
	img, _, err := image.Decode(content)
	if err != nil {
		return nil, err
	}
	resized := transform.Resize(img, w, h, transform.NearestNeighbor)
	ext := strings.ToLower(strings.Trim(imgType, "\t\n "))
	log.WithFields(log.Fields{
		"Image Extension": imgType,
		"extension":       ext,
	}).Info("ImgType")
	switch ext {
	case "png":
		err = imgio.PNGEncoder()(buf, resized)
	case "jpg", "jpeg":
		err = imgio.JPEGEncoder(80)(buf, resized)
	case "tiff", "bmp":
		err = imgio.BMPEncoder()(buf, resized)
	default:
		return nil, errors.New("invalid format is specified")
	}
	if err != nil {
		log.WithFields(log.Fields{
			"error": err,
		}).Error("error while encoding image")
	}
	return buf.Bytes(), err
}

func loadHasuraConfig(ssmClient *secret.SsmAPI) (*wrapper.HasuraSSMConfig, error) {
	chErr := ""
	hsEndpointCh := make(chan string, 1)
	go func() {
		ep, err := ssmClient.GetParameter(constants.HasuraEndpoint)
		if err != nil {
			log.WithFields(log.Fields{
				"param": constants.HasuraEndpoint,
				"error": err,
			}).Error("Loading Hasura config error: Get Parameter error")
			hsEndpointCh <- chErr
		}
		hsEndpointCh <- ep
	}()

	hsAdminSecCh := make(chan string, 1)
	go func() {
		sec, err := ssmClient.GetDecryptedParameter(constants.HasuraAdminSecret)
		if err != nil {
			log.WithFields(log.Fields{
				"param": constants.HasuraAdminSecret,
				"error": err,
			}).Error("Loading Hasura config error: Get Parameter error")
			hsAdminSecCh <- chErr
		}
		hsAdminSecCh <- sec
	}()

	hsEp := <-hsEndpointCh
	if hsEp == chErr {
		return nil, errors.Errorf("Getting SSM Parameter %s failed", constants.HasuraEndpoint)
	}
	hsSec := <-hsAdminSecCh
	if hsSec == chErr {
		return nil, errors.Errorf("Getting SSM Parameter %s failed", constants.HasuraAdminSecret)
	}
	return &wrapper.HasuraSSMConfig{
		HasuraEndpoint:    hsEp,
		HasuraAdminSecret: hsSec,
	}, nil
}
