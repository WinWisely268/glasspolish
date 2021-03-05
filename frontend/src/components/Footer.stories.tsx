import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Footer, FooterProps} from './Footer'

export default {
    title: 'Footer',
    component: Footer,
} as Meta

const Template: Story<FooterProps> = (args) => <Footer {...args}/>

export const FooterTest = Template.bind({});
FooterTest.args = {
    name: 'Alexander Adhyatma',
    linkUri: 'https://github.com/WinWisely268',
}