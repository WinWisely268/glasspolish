import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {DEBOUNCE_TIME} from '../../utilities/validators'

export interface GenericFieldProps {
    isRequired: boolean
    setField: (content: string) => void
    validationFunc: (content: string) => boolean
    messages: Record<string, string>
    inputType: string
    placeholderValue: string
}

export const GenericField: React.FunctionComponent<GenericFieldProps> = ({
                                                                             isRequired,
                                                                             setField,
                                                                             validationFunc,
                                                                             messages,
                                                                             inputType,
                                                                             placeholderValue,
                                                                         }) => {
    const [valid, setValid] = useState<boolean>(true)
    const [hint, setHint] = useState<string>('')

    let delay: any = null
    const validate = (content: string): any => {
        if (delay !== null) {
            clearTimeout(delay)
        }
        delay = setTimeout(() => {
            const isValid = validationFunc(content)
            setValid(isValid)
            setHint(
                isValid
                    ? ''
                    : content.length > 0
                    ? messages.invalidInput
                    : messages.hintEmpty
            )
            setField(isValid ? content : messages.invalidInput)
            delay = null
        }, DEBOUNCE_TIME)
    }

    return (
        <TextField
            error={!valid}
            defaultValue={placeholderValue}
            placeholder={placeholderValue}
            variant='outlined'
            margin='normal'
            required={isRequired}
            fullWidth
            id={messages.id}
            label={messages.label}
            name={messages.name}
            autoComplete={messages.autoComplete}
            type={inputType}
            helperText={hint}
            InputLabelProps={{shrink: true}}
            onChange={(e) => validate(e.currentTarget.value)}
        />
    )
}
