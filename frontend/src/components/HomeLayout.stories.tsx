import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {HomeLayout, HomeLayoutProps} from './HomeLayout'

export default {
    title: 'HomeLayout',
    component: HomeLayout,
} as Meta

const Template: Story<HomeLayoutProps> = (args) => <HomeLayout {...args}/>

export const FooterTest = Template.bind({});
FooterTest.args = {
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