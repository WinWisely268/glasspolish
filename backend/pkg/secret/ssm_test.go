package secret_test

import (
	"github.com/winwisely268/glasspolish-triggers/pkg/config"
	"github.com/winwisely268/glasspolish-triggers/pkg/secret"
	"testing"
)

func TestGetDecryptedParameter(t *testing.T) {

	ssmApi := secret.NewSsmAPI(config.InitConfig())

	val, err := ssmApi.GetDecryptedParameter("/applications/GlassPolish/CloudFront/PrivateKey")
	if err != nil {
		t.Fatalf("GetDecryptedParameter failed: %v", err)
	}
	t.Logf("GetDecryptedParameter: %v", val)

}

func TestGetParameters(t *testing.T) {
	ssmApi := secret.NewSsmAPI(config.InitConfig())

	vals, err := ssmApi.GetParameters("/applications/GlassPolish/CloudFront/KeyId", "/applications/SFDashbboard/CloudFront/PrivateKey")
	if err != nil {
		t.Fatalf("GetParameters failed: %v", err)
	}
	t.Logf("GetParameters: %v", vals)
}
