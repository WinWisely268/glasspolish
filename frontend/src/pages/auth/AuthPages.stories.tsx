import React from 'react'
import {Meta} from '@storybook/react/types-6-0'
import {AuthSignIn} from "./SignIn"
import {AuthSignUp} from './SignUp'
import {storiesOf} from "@storybook/react";
import ResetPassword from "./ResetPassword";
import ConfirmResetPassword from "./ConfirmResetPassword";
import ConfirmSignUpEmail from "./ConfirmSignUpEmail";
import ConfirmSignUp from "./ConfirmSignUp";

export default {
    title: 'Auth Pages',
    component: AuthSignIn,
} as Meta

storiesOf('Auth Pages', module)
    .add('SignIn', () => <AuthSignIn/>)
    .add('SignUp', () => <AuthSignUp/>)
    .add('Confirm', () => <ConfirmSignUp location={''}/>)
    .add('ConfirmSignUpEmail', () => <ConfirmSignUpEmail />)
    .add('ResetPassword', () => <ResetPassword/>)
    .add('ConfirmResetPassword', () => <ConfirmResetPassword location={''}/>)