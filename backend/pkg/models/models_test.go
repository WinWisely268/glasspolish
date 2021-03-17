package models_test

import (
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"testing"
)

func TestToPrefix(t *testing.T) {
	objectKey := "raw-images/fde6dd37-f511-4c3f-9587-7931a7e17638/profile_pictures/46484179-32a7-4dd9-9170-916bae83ef09/picture_url/1615441756/gp_logo.jpg"
	prefix, err := models.ToPrefix(objectKey)
	require.NoError(t, err)
	require.Equal(t, prefix.AccountID, uuid.MustParse("fde6dd37-f511-4c3f-9587-7931a7e17638"))
	require.Equal(t, prefix.TableName, "profile_pictures")
}

func TestPrefix_GenerateMutationQuery(t *testing.T) {
	objectKey := "raw-images/fde6dd37-f511-4c3f-9587-7931a7e17638/profile_pictures/46484179-32a7-4dd9-9170-916bae83ef09/picture_url/1615441756/gp_logo.jpg"
	prefix, err := models.ToPrefix(objectKey)
	require.NoError(t, err)
	queryMutation, err := prefix.GenerateMutationQuery()
	require.NoError(t, err)
	t.Logf("query mutation: %s\n", queryMutation)
}
