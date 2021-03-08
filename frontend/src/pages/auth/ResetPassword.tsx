import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import Layout from '../../layouts/Layout'
import AuthLayout from '../../layouts/AuthLayout'
import Snackbar from '../../components/shared/Snackbar'

import {AuthContext} from '../../providers/AuthProvider'
import AuthEmailField from "../../components/auth/AuthEmailField";
import AuthButton from '../../components/auth/AuthButton'
import {useStyles} from '../../components/auth/styles'
import {AllRoutesStr} from "../../routes/constants";


export interface AuthResetProps {
}

const AuthReset: React.FunctionComponent<AuthResetProps> = () => {
    const authContext = useContext(AuthContext)
    const [error, setError] = useState<string>('')
    const [disable, setDisable] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const history = useHistory()

    useEffect(() => {
        setDisable(!email)
    }, [email])

    const submitHandler = (e: any) => {
        e.preventDefault()
        authContext
            .resetPassword(email)
            .then(data => {
                history.push(AllRoutesStr.Auth.resetPassword.confirm)
            })
            .catch(err => {
                setError(err)
            })
    }

    const setErrorMsg = useCallback((message: string) => {
        setError(message)
    }, [])

    const classes = useStyles()

    return (
        <Layout title='Reset Password'>
            <AuthLayout title='Reset Password'>
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
                    <AuthButton disabled={disable}>Reset</AuthButton>
                </form>
            </AuthLayout>
        </Layout>
    )
}

export default AuthReset
