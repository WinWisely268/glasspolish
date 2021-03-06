import React from 'react'
import {GenericField} from "../GenericFormField";

export interface AuthCodeFieldProps {
    setCode: (code: string) => void
}

const AuthCodeField: React.FunctionComponent<AuthCodeFieldProps> = ({setCode}) => {
    return (
        <GenericField
            placeholderValue={'012345'}
            inputType={'text'}
            isRequired={true}
            setField={setCode}
            validationFunc={(c) => c.length === 6}
            messages={{
                id: 'confirmation',
                label: 'Confirmation Code',
                name: 'confirmation',
                autoComplete: 'false',
                invalidInput: 'Invalid Auth Code',
            }}
        />
    )
}

export default AuthCodeField
