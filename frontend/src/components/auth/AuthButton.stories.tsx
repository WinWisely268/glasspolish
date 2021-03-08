import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {AuthButton, AuthButtonProps} from './AuthButton'

export default {
    title: 'AuthButton',
    component: AuthButton,
} as Meta

const Template: Story<AuthButtonProps> = (args) => <AuthButton {...args}/>

export const AuthButtonDisabled = Template.bind({})
AuthButtonDisabled.args = {
    disabled: true,
    children: 'Disabled',
}

export const AuthButtonEnabled = Template.bind({})
AuthButtonEnabled.args = {
    disabled: false,
    children: 'Enabled',
}