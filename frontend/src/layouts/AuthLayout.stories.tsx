import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {AuthLayout, AuthLayoutProps} from "./AuthLayout";

export default {
    title: 'AuthLayout',
    component: AuthLayout,
} as Meta

const Template: Story<AuthLayoutProps> = (args) => <AuthLayout {...args}/>

export const AuthLayoutTest = Template.bind({});
AuthLayoutTest.args = {
    title: 'Hello Alex',
    children: <div>
        <ul>
            <li>1. Cuci</li>
            <li>2. Jamur</li>
            <li>3. Kaca</li>
        </ul>
        <p>Blah blah blah yadda yadda</p>
    </div>,
}