package imgapi_test

import (
	"github.com/stretchr/testify/require"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/imgapi"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"io/ioutil"
	"os"
	"testing"
)

func TestGetDownloadURL(t *testing.T) {

	req := &models.DownloadURLRequest{
		Scheme: "https",
		Domain: os.Getenv("CF_DOMAIN_NAME"),
		File:   "test.jpg",
	}

	downloadimgapi, err := imgapi.NewDownloadSvc(config.InitConfig())
	if err != nil {
		t.Fatalf("NewDownloadService failed: %v", err)
	}

	resp, err := downloadimgapi.GetDownloadURL(req)
	if err != nil {
		t.Fatalf("GetDownloadURL failed: %v", err)
	}
	t.Logf("GetDownloadURL: %v", resp)
}

func TestResizeImgJpg(t *testing.T) {
	imgFile, err := os.Open("./testdata/logo.jpg")
	require.NoError(t, err)
	defer imgFile.Close()
	result, err := imgapi.Resize(imgFile, "jpg", 100, 100)
	require.NoError(t, err)
	require.NotEqual(t, result, imgFile)

	err = ioutil.WriteFile("./testdata/resized.jpg", result, 0644)
	require.NoError(t, err)
}