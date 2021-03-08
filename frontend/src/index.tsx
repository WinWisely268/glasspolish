import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import AuthContextProvider from "./providers/AuthProvider";
import {Amplify} from "aws-amplify";

const AwsConfig = {
    aws_project_region: 'ap-southeast-1',
    aws_cognito_region: 'ap-southeast-1',
    aws_user_pools_id: 'ap-southeast-1_oeBStG9mu',
    aws_user_pools_web_client_id: '4550r7g7lr72rukjc5hk4hj2lj',
    oauth: {
        domain:
            'gp0.auth.ap-southeast-1.amazoncognito.com',
        scope: ['phone', 'email', 'openid', 'profile'],
        // eslint-disable-next-line max-len
        redirectSignIn:
            'http://localhost:3000/,https://dev.glasspolish.store/',
        redirectSignOut:
            'http://localhost:3000/,https://dev.glasspolish.store/',
        responseType: 'token',
    },
    federationTarget: 'COGNITO_USER_POOLS',
}

AwsConfig.oauth.domain = 'dev.glasspolish.store'
AwsConfig.oauth.responseType = 'code'
Amplify.configure(AwsConfig)

const app = (
    <BrowserRouter>
        <Suspense fallback={<CircularProgress/>}>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Suspense>
    </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
