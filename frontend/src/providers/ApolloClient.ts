import {
  from,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { Auth } from '@aws-amplify/auth'
import { OperationDefinitionNode } from 'graphql'
import { WebSocketLink } from '@apollo/link-ws'
import { setContext } from '@apollo/link-context'
import { Config } from './Config'

export const XHasuraClientName = 'X-Hasura-Client-Name'
export const XHasuraAdminSecret = 'X-Hasura-Admin-Secret'
export const AuthorizationHeader = 'Authorization'
export const AuthBearer = 'Bearer'

export const getIdToken = async (): Promise<string> => {
  const session = await Auth.currentSession()
  const idToken = session.getIdToken().getJwtToken()
  // console.log(idToken)
  return idToken ? Promise.resolve(idToken) : Promise.reject()
}

const getBearerToken = (token: string): string | null =>
  token ? `${AuthBearer} ${token}` : null

const authLink = setContext((_, { headers }) =>
  getIdToken().then((token) => ({
    headers: {
      [AuthorizationHeader]: getBearerToken(token),
      ...headers
    }
  }))
)

const httpLink = from([
  authLink,
  // errorLink,
  new HttpLink({
    uri: Config.httpDataHost,
    headers: {
      [XHasuraClientName]: Config.hasuraClientName
    }
  })
])

const wsLink = new WebSocketLink({
  uri: Config.wsDataHost,
  options: {
    reconnect: true,
    connectionParams: () =>
      getIdToken().then((token) => ({
        headers: {
          [AuthorizationHeader]: getBearerToken(token),
          [XHasuraClientName]: Config.hasuraClientName
        }
      }))
  },
  lazy: true,
  connectionCallback: (error: any) => {
    console.error('connection error: ', error)
  }
})

const splitLink = (http: ApolloLink, ws: WebSocketLink): ApolloLink =>
  split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(
        query
      ) as OperationDefinitionNode

      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    ws,
    http
  )

const commonApolloOptions = {
  version: Config.version
}

export const authGQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink(httpLink, wsLink),
  ...commonApolloOptions
})

export const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: Config.httpDataHost
  }),
  ...commonApolloOptions
})
