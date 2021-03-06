import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Layout, LayoutProps} from './Layout'

export default {
    title: 'Layout',
    component: Layout,
} as Meta

const Template: Story<LayoutProps> = (args) => <Layout {...args}/>

export const LayoutTest = Template.bind({});
LayoutTest.args = {
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