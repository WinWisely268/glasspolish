function assertEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Env ${key} is missing`)
  }

  return value
}

const DATA_SCHEME = process.env.REACT_APP_DATA_SCHEME || 'http'
const DATA_DOMAIN = assertEnv(process.env.REACT_APP_DATA_DOMAIN, 'DATA_DOMAIN')
const WS_SCHEME = DATA_SCHEME === 'https' ? 'wss' : 'ws'
const HASURA_ADMIN_SECRET = assertEnv(
  process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET,
  'REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET'
)
const GOOGLE_CLIENT_ID = assertEnv(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  'REACT_APP_GOOGLE_CLIENT_ID'
)

const AWS_UPLOAD_ENDPOINT = assertEnv(
  process.env.REACT_APP_AWS_UPLOAD_ENDPOINT,
  'REACT_APP_AWS_UPLOAD_ENDPOINT'
)

export const Config = {
  httpDataHost: `${DATA_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  wsDataHost: `${WS_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  hasuraClientName: assertEnv(
    process.env.REACT_APP_HASURA_CLIENT_NAME,
    'REACT_APP_HASURA_CLIENT_NAME'
  ),
  hasuraAdminSecret: HASURA_ADMIN_SECRET,
  version: process.env.VERSION || '1.0.0',
  debug: process.env.NODE_ENV !== 'production',
  googleClientId: GOOGLE_CLIENT_ID,
  awsUploadEndpoint: AWS_UPLOAD_ENDPOINT
}
