package secret_test

import (
	"github.com/stretchr/testify/require"
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/secret"
	"testing"
)

func TestGetDecryptedParameter(t *testing.T) {

	ssmApi := secret.NewSsmAPI(config.InitConfig())
	_, err := ssmApi.GetDecryptedParameter("/applications/GlassPolish/CloudFront/PrivateKey")
	require.NoError(t, err)

}

func TestGetParameters(t *testing.T) {
	ssmApi := secret.NewSsmAPI(config.InitConfig())

	_, err := ssmApi.GetParameters("/applications/GlassPolish/CloudFront/KeyId", "/applications/SFDashbboard/CloudFront/PrivateKey")
	require.NoError(t, err)
}
