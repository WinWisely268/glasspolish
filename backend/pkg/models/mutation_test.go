package models_test

import (
	"github.com/stretchr/testify/require"
	"github.com/winwisely268/glasspolish-triggers/pkg/models"
	"testing"
)

func TestModelCreateMutation(t *testing.T) {
	key := "raw-images/fde6dd37-f511-4c3f-9587-7931a7e17638/profile_pictures/46484179-32a7-4dd9-9170-916bae83ef09/picture_url/1615441756/gp_logo.jpg"
	pf, err := models.ToPrefix(key)
	require.NoError(t, err)
	require.NotEqual(t, nil, pf)
	t.Log(pf)

	query, err := pf.GenerateMutationQuery()
	require.NoError(t, err)
	require.NotEqual(t, nil, query)
	require.NotEqual(t, nil, query.Header)
	t.Log(query)
}
