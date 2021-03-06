import React, {useContext, useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import {Link, Grid} from '@material-ui/core'
import Layout from '../layouts/Layout'
import Snackbar from '../components/shared/Snackbar'

import {AuthContext} from '../providers/AuthProvider'
import AuthButton from '../components/auth/AuthButton'
import AuthEmailField from '../components/auth/AuthEmailField'
import AuthPasswordField from '../components/auth/AuthPasswordField'
import AuthLayout from '../layouts/AuthLayout'
import {useStyles} from '../components/auth/styles'

export interface AuthSignInProps {
}

const AuthSignIn: React.FunctionComponent<AuthSignInProps> = () => {
    const authContext = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [disable, setDisable] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const history = useHistory()

    useEffect(() => {
        setDisable(!(email && password))
    }, [email, password])

    const submitHandler = (e: any) => {
        e.preventDefault()
        authContext
            .signIn(email, password)
            .then((data) => {
                console.log('sign in success!')
            })
            .catch((err) => {
                console.error('error:', err)
                setError(err)
            })
    }

    const setErrorMsg = useCallback((message: string) => {
        setError(message)
    }, [])

    const classes = useStyles()

    return (
        <Layout title='Sign In'>
            <AuthLayout title='Sign In'>
                <Snackbar
                    variant='error'
                    message={error}
                    setMessage={(message) => setErrorMsg(message)}
                />
                <form
                    className={classes.form}
                    onSubmit={(e) => submitHandler(e)}
                    noValidate
                >
                    <AuthEmailField setEmail={(email) => setEmail(email)}/>
                    <AuthPasswordField
                        setPassword={(password) => setPassword(password)}
                    />
                    <AuthButton disabled={disable}>Sign In</AuthButton>
                    <Grid container>
                        <Grid item xs className={classes.links}>
                            <Link
                                href='#'
                                onClick={() => history.push('/auth/resetpassword')}
                                variant='body2'
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item className={classes.links}>
                            <Link
                                href='#'
                                onClick={() => history.push('/auth/signup')}
                                variant='body2'
                            >
                                Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
        </Layout>
    )
}

export default AuthSignIn
