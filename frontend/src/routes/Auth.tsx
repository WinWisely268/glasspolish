import React, {useContext, useEffect} from 'react'
import {Route, Switch, useHistory} from 'react-router-dom'

import {AuthContext} from '../providers/AuthProvider'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import ConfirmSignUp from '../pages/auth/ConfirmSignUp'
import ConfirmSignUpEmail from '../pages/auth/ConfirmSignUpEmail'
import ResetPassword from '../pages/auth/ResetPassword'
import ConfirmResetPassword from '../pages/auth/ConfirmResetPassword'
import {AllRoutesStr} from "./constants";

export interface AuthProps {
}

const Auth: React.FunctionComponent<AuthProps> = () => {
    const authContext = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        console.log('authenticated?', authContext.isAuthenticated())
        if (authContext.isAuthenticated()) {
            history.push('/')
        }
    }, [authContext, history])

    authContext.isAuthenticated() && history.push('/')

    const routes = authContext.isAuthenticated() ? null : (
        <Switch>
            <Route exact path={AllRoutesStr.Auth.root} component={SignIn}/>
            <Route exact path={AllRoutesStr.Auth.signIn} component={SignIn}/>
            <Route exact path={AllRoutesStr.Auth.signUp.root} component={SignUp}/>
            <Route exact path={AllRoutesStr.Auth.signUp.confirm} component={ConfirmSignUp}/>
            <Route
                exact
                path={AllRoutesStr.Auth.signUp.confirmEmail}
                component={ConfirmSignUpEmail}
            />
            <Route exact path={AllRoutesStr.Auth.resetPassword.root} component={ResetPassword}/>
            <Route
                exact
                path={AllRoutesStr.Auth.resetPassword.confirm}
                component={ConfirmResetPassword}
            />
        </Switch>
    )

    return <React.Fragment>{routes}</React.Fragment>
}

export default Auth
