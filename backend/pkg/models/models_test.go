package models_test

import (
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"testing"
)

func TestToPrefix(t *testing.T) {
	objectKey := "raw-images/611e10fb-8cff-467d-ba9c-599e2ff511fd/user_pictures/9adc7315-deef-4c43-8f0a-9bca461a5efc/picture_url/1600245773000000/some_picture.jpg"
	prefix, err := models.ToPrefix(objectKey)
	assert.NoError(t, err)
	assert.Equal(t, prefix.AccountID, uuid.MustParse("611e10fb-8cff-467d-ba9c-599e2ff511fd"))
	assert.Equal(t, prefix.TableName, "user_pictures")
}

func TestPrefix_GenerateMutationQuery(t *testing.T) {
	objectKey := "611e10fb-8cff-467d-ba9c-599e2ff511fd/user_pictures/9adc7315-deef-4c43-8f0a-9bca461a5efc/picture_url/1600245773000000/some_picture.jpg"
	prefix, err := models.ToPrefix(objectKey)
	assert.NoError(t, err)
	queryMutation, err := prefix.GenerateMutationQuery()
	assert.NoError(t, err)
	t.Logf("query mutation: %s\n", queryMutation)
}
