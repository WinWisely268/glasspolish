import React from 'react'
import Layout from '../../layouts/Layout'

import {useStyles} from '../../layouts/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export interface AccessDeniedProps {
}

const AccessDenied: React.FunctionComponent<AccessDeniedProps> = () => {
    const classes = useStyles()
    return (
        <Layout title='Access Denied'>
            <CssBaseline/>
            <div className={classes.paper}>
                <h1>Access Denied</h1>
            </div>
        </Layout>
    )
}

export default AccessDenied
