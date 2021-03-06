import React, { useState, useCallback, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'
import { useHistory } from 'react-router-dom'

export interface AuthContextProps {
  user: null | CognitoUser
  provider: string
  name: string
  email: string
  role: string

  isAuthenticated(): boolean


  signUp(username: string, password: string): Promise<any>

  confirmSignUp(userEmail: string, code: string): Promise<any>

  resendSignUp(userEmail: string): Promise<any>

  signIn(username: string, password: string): Promise<any>

  signOut(): Promise<any>

  resetPassword(userEmail: string): Promise<any>

  confirmResetPassword(
    userEmail: string,
    newPassword: string,
    code: string
  ): Promise<any>
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  provider: '',
  name: '',
  email: '',
  role: '',
  isAuthenticated: () => false,
  signUp: () => new Promise(reject => reject(0)),
  confirmSignUp: () => new Promise(reject => reject(0)),
  resendSignUp: () => new Promise(reject => reject(0)),
  signIn: () => new Promise(reject => reject(0)),
  signOut: () => new Promise(reject => reject(0)),
  resetPassword: () => new Promise(reject => reject(0)),
  confirmResetPassword: () => new Promise(reject => reject(0))
})

export interface AuthContextProviderProps {
  children: any
}

const AuthContextProvider: React.FunctionComponent<AuthContextProviderProps> = ({
                                                                                  children
                                                                                }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('')
  const [provider, setProvider] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const history = useHistory()

  useEffect(() => {
    console.log('checking for authenticated user...')
    getUserData()
  }, [])

  useEffect(() => {
    Hub.listen('auth', data => {
      const { payload } = data
      switch (payload.event) {
        case 'signIn':
          getUserData()
          history.push('/')
          break
        case 'signOut':
          setUser(null)
          setProvider('')
          localStorage.setItem('provider', '')
          setEmail('')
          setName('')
          history.push('/')
          break
      }
    })
  }, [history])

  const getUserData = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        // console.log('current', data)

        setUser(data)
        const email = data.email || data.attributes.email || ''
        const payload = data.getSignInUserSession().getIdToken().payload['https://hasura.io/jwt/claims']
        const parsedPayload = JSON.parse(payload)
        const role = parsedPayload['x-hasura-role'] || ''
        const name = data.name || data.attributes.email || ''
        const provider = localStorage.getItem('provider') || ''

        setEmail(email)
        setName(name)
        setRole(role)
        setProvider(provider)
      })
      .catch(err => {
        console.log('no current authenticated user: ', err)
      })
  }

  const isAuthenticated = (): boolean => user !== null && (role === 'supers' || role === 'admins')

  const signUp = useCallback((userEmail: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.signUp({
          username: userEmail,
          password: password
        })
        resolve(user)
      } catch (err) {
        let message: string = 'Internal Error'
        switch (err.code) {
          case 'UserNotConfirmedException':
          case 'PasswordResetRequiredException':
          case 'NotAuthorizedException':
          case 'UserNotFoundException':
          case 'UsernameExistsException':
            message = err.message
            break
          default:
            console.log(err)
            break
        }
        reject(message)
      }
    })
  }, [])

  const confirmSignUp = useCallback((userEmail: string, code: string) => {
    console.log('confirm sign up', userEmail, code)
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.confirmSignUp(userEmail, code)
        resolve(user)
      } catch (err) {
        const message = err.message || 'Internal Error'
        reject(message)
      }
    })
  }, [])

  const signIn = useCallback((userEmail: string, password: string) => {
    console.log('sign in', userEmail)
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Auth.signIn({
          username: userEmail,
          password: password
        })
        localStorage.setItem('provider', 'email')
        // console.log(data)
        resolve(data)
      } catch (err) {
        const message = err.message || 'Internal error'
        reject(message)
      }
    })
  }, [])

  const resendSignUp = useCallback((userEmail: string) => {
    console.log('resend sign up', userEmail)
    return new Promise((resolve, reject) => {
      Auth.resendSignUp(userEmail)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'Internal Error'
          reject(message)
        })
    })
  }, [])

  const signOut = useCallback(() => {
    console.log('sign out')
    return new Promise((resolve, reject) => {
      Auth.signOut({ global: true })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'Internal Error'
          reject(message)
        })
    })
  }, [])

  const resetPassword = useCallback((userEmail: string) => {
    console.log('reset password', userEmail)
    return new Promise((resolve, reject) => {
      Auth.forgotPassword(userEmail)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'Internal Error'
          reject(message)
        })
    })
  }, [])

  const confirmResetPassword = useCallback(
    (userEmail: string, newPassword: string, code: string) => {
      console.log('confirm reset password', userEmail, code, newPassword)
      return new Promise((resolve, reject) => {
        Auth.forgotPasswordSubmit(userEmail, code, newPassword)
          .then(data => resolve(data))
          .catch(err => {
            const message = err.message || 'Internal error'
            reject(message)
          })
      })
    },
    []
  )

  return (
    <AuthContext.Provider
      value={{
        user: user,
        provider: provider,
        name: name,
        email: email,
        role: role,
        isAuthenticated: isAuthenticated,
        signUp: signUp,
        confirmSignUp: confirmSignUp,
        resendSignUp: resendSignUp,
        signIn: signIn,
        signOut: signOut,
        resetPassword: resetPassword,
        confirmResetPassword: confirmResetPassword
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
