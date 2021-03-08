package wrapper_test

import (
	"github.com/aws/aws-sdk-go-v2/feature/cloudfront/sign"
	"github.com/stretchr/testify/require"
	"io/ioutil"
	"os"
	"strings"
	"testing"
)

func TestLoadFilePrivKey(t *testing.T) {

	content, err := ioutil.ReadFile(os.Getenv("PRIVATE_KEY_FILE"))
	if err != nil {
		t.Fatalf("ReadFile failed: %v", err)
	}

	pkStr := string(content)

	privKey, err := sign.LoadPEMPrivKey(strings.NewReader(pkStr))
	require.NoError(t, err)
	t.Logf("LoadPrivKey: %v", privKey)
}
