import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Themer, ThemerProps} from './Themer'
import {Header} from '../components/Header'
import Footer from "../components/Footer";

export default {
    title: 'Themer',
    component: Themer,
} as Meta

const Template: Story<ThemerProps> = (args) => <Themer {...args}/>

export const FooterTest = Template.bind({});
FooterTest.args = {
    children: <div>
        <Header />
        <p>Blah blah blah yadda yadda</p>
        <Footer name='bleh' linkUri='https://example.com' />
    </div>,
}