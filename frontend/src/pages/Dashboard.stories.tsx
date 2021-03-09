import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { MemoryRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { storiesOf } from '@storybook/react'

export default {
  title: 'Dashboard Main Page',
  component: Dashboard
} as Meta

storiesOf('Dashboard Page', module)
  .add('Dashboard Page', () => <MemoryRouter><Dashboard /></MemoryRouter>)