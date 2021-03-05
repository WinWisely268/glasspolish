package constants

import "time"

const (
	Prefix = "/applications/GlassPolish/"
	HasuraEndpoint = Prefix + "HasuraEndpoint"
	HasuraAdminSecret = Prefix + "HasuraAdminSecret"
	UserPoolId = Prefix + "UserPoolId"
	DefaultGraphQLEndpoint = "https://api.glasspolish.store/v1/graphql"
	DefaultRegion = "ap-southeast-1"

	ContextTimeoutSeconds = 5 * time.Second
)
