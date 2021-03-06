import React, {useState} from 'react'
import {Meta} from '@storybook/react/types-6-0'
import {GenericField, GenericFieldProps} from "./GenericFormField";
import {storiesOf} from "@storybook/react";

export default {
    title: 'GenericFormField',
    component: GenericField,
} as Meta

interface UserFormState {
    birthDate: string
    address: string
}

function placeholderSetField(content: string) {
}

function GenericFieldTest(args: GenericFieldProps) {
    const [placeholderValues, setplaceholderValues] = useState<UserFormState>({
        birthDate: '',
        address: '',
    })
    const handleChangeDOB = (val: string) => {
        setplaceholderValues({...placeholderValues, birthDate: val})
    }
    const handleChangeAddress = (val: string) => {
        setplaceholderValues({...placeholderValues, address: val})
    }
    return <GenericField isRequired={args.isRequired} inputType={args.inputType}
                         placeholderValue={args.inputType === 'date' ? placeholderValues.birthDate : placeholderValues.address}
                         setField={args.inputType === 'date' ? handleChangeDOB : handleChangeAddress}
                         validationFunc={args.validationFunc} messages={args.messages}/>
}

storiesOf('Generic Form Field tests', module)
    .add('For Address', () => <GenericFieldTest isRequired={true} setField={placeholderSetField}
                                                validationFunc={(c: string) => c.length > 0} messages={{
        id: 'userAddress',
        label: 'address',
        autoComplete: 'false',
        name: 'addressForm',
        invalidInput: 'Invalid address'
    }} inputType={'text'} placeholderValue={'Green Light District'}/>)
    .add('For Dates', () => <GenericFieldTest isRequired={true} setField={placeholderSetField}
                                              validationFunc={(c) => true} messages={{
        id: 'userDOB',
        label: 'dateOfBirth',
        autoComplete: 'false',
        name: 'dobForm',
        invalidInput: 'Invalid date'
    }} inputType={'date'} placeholderValue={''}/>)