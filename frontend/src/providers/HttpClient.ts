import ky from 'ky'
import { getIdToken } from './ApolloClient'

const httpClient = ky.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const idToken = await getIdToken()
        request.headers.set('Authorization', `Bearer ${idToken}`)
      }
    ]
  }
})

export default httpClient
