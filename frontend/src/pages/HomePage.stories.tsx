import React from 'react'
import {Meta} from '@storybook/react/types-6-0'
import Home from "./Home"
import {storiesOf} from "@storybook/react";

export default {
    title: 'Home Page',
    component: Home,
} as Meta

storiesOf('Home Page', module)
    .add('Home Page', () => <Home/>)