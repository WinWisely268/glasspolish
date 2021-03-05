package secret_test

import (
	"github.com/winwisely268/glasspolish-triggers/pkg/secret"
	"testing"
)

func TestGetDecryptedParameter(t *testing.T) {

	ssmApi := secret.NewSsmAPI()

	val, err := ssmApi.GetDecryptedParameter("/applications/SFUpload/CloudFront/PrivateKey")
	if err != nil {
		t.Fatalf("GetDecryptedParameter failed: %v", err)
	}
	t.Logf("GetDecryptedParameter: %v", val)

}

func TestGetParameters(t *testing.T) {
	ssmApi := secret.NewSsmAPI()

	vals, err := ssmApi.GetParameters("/applications/SFUpload/CloudFront/KeyId", "/applications/SFDashbboard/CloudFront/PrivateKey")
	if err != nil {
		t.Fatalf("GetParameters failed: %v", err)
	}
	t.Logf("GetParameters: %v", vals)
}
