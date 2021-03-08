import React from 'react'
import {useHistory} from 'react-router-dom'

import EmailIcon from '@material-ui/icons/Email'
import Button from '@material-ui/core/Button'
import {useStyles} from './auth/styles'
import {AllRoutesStr} from "../routes/constants";

export interface HostedUiSignInProps {
}

const HostedUiSignIn: React.FunctionComponent<HostedUiSignInProps> = () => {
    const history = useHistory()
    const classes = useStyles()

    return (
        <Button
            variant='contained'
            color='primary'
            onClick={() => history.push(AllRoutesStr.Auth.signIn)}
            className={classes.btn}
            size='large'>
            <div className={classes.btnElems}>
                <div className={classes.btnIcon}>
                    <EmailIcon/>
                </div>
                <div className={classes.btnLabel}>Sign in with Email</div>
            </div>
        </Button>
    )
}

export default HostedUiSignIn
