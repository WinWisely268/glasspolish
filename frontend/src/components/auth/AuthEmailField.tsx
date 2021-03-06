import React from 'react'
import {GenericField} from "../GenericFormField"
import {validateEmail} from '../../utilities/validators'

export interface AuthEmailFieldProps {
    setEmail: (email: string) => void
}

const AuthEmailField: React.FunctionComponent<AuthEmailFieldProps> = ({
                                                                          setEmail
                                                                      }) => {
    return (
        <GenericField
            placeholderValue={'test@example.com'}
            inputType={'text'}
            messages={{
                id: 'email',
                label: 'Email',
                name: 'email',
                autoComplete: 'email',
            }}
            isRequired={true}
            setField={setEmail}
            validationFunc={validateEmail}
        />
    )
}

export default AuthEmailField
