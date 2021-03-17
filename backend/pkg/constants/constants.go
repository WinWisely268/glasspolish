package constants

import "time"

const (
	Prefix                 = "/applications/GlassPolish/"
	HasuraEndpoint         = Prefix + "HasuraEndpoint"
	HasuraAdminSecret      = Prefix + "HasuraAdminSecret"
	UserPoolId             = Prefix + "UserPoolId"
	SSMKeyId               = Prefix + "CloudFront/KeyId"
	SSMPrivateKey          = Prefix + "CloudFront/PrivateKey"
	DefaultGraphQLEndpoint = "https://api.glasspolish.store/v1/graphql"
	DefaultRegion          = "ap-southeast-1"

	ContextTimeoutSeconds = 5 * time.Second

	TTLS3PresignedURL = 60 * time.Minute
	ResizedDir        = "resized/"
	ImageDir          = "raw-images/"
	CFSignedURLTTL    = 30 * 24 * time.Hour
	HasuraTimeout     = 4 * time.Second
)
