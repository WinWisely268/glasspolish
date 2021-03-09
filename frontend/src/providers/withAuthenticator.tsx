import React, {useContext} from 'react'
import {AuthContext} from './AuthProvider'
import AccessDenied from '../components/shared/AccessDenied'

export interface withAuthenticatorProps {
}

const withAuthenticator = (
    WrappedComponent: React.ComponentType
): React.FunctionComponent<withAuthenticatorProps> => {
    return () => {
        const authContext = useContext(AuthContext)
        const page = authContext.isAuthenticated() ? (
            <WrappedComponent/>
        ) : (
            <AccessDenied/>
        )
        return <div>{page}</div>
    }
}

export default withAuthenticator
