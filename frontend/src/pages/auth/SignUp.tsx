import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import {Link, Grid} from '@material-ui/core'
import Layout from '../../layouts/Layout'
import Snackbar from '../../components/shared/Snackbar'

import {AuthContext} from '../../providers/AuthProvider'
import AuthLayout from '../../layouts/AuthLayout'
import AuthEmailField from '../../components/auth/AuthEmailField'
import AuthPasswordField from '../../components/auth/AuthPasswordField'
import AuthButton from '../../components/auth/AuthButton'
import {useStyles} from '../../components/auth/styles'
import {AllRoutesStr} from "../../routes/constants";

export interface AuthSignUpProps {
}

export const AuthSignUp: React.FunctionComponent<AuthSignUpProps> = () => {
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
            .signUp(email, password)
            .then(data => {
                history.push('/auth/signup/confirm', email)
            })
            .catch(err => {
                console.error('error:', err)
                setError(err)
            })
    }

    const setErrorMsg = useCallback((message: string) => {
        setError(message)
    }, [])

    const classes = useStyles()
    return (
        <Layout title='Sign Up'>
            <AuthLayout title='Sign Up'>
                <Snackbar
                    variant='error'
                    message={error}
                    setMessage={message => setErrorMsg(message)}
                />
                <form
                    className={classes.form}
                    onSubmit={e => submitHandler(e)}
                    noValidate>
                    <AuthEmailField setEmail={email => setEmail(email)}/>
                    <AuthPasswordField setPassword={password => setPassword(password)}/>
                    <AuthButton disabled={disable}>Sign Up</AuthButton>
                    <Grid container>
                        <Grid item xs className={classes.links}>
                            <Link
                                href='#'
                                onClick={() => history.push('/auth')}
                                variant='body2'>
                                {'Sign In'}
                            </Link>
                        </Grid>
                        <Grid item className={classes.links}>
                            <Link
                                href='#'
                                onClick={() => history.push(AllRoutesStr.Auth.signUp.confirmEmail)}
                                variant='body2'>
                                {'Confirm Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
        </Layout>
    )
}

export default AuthSignUp
