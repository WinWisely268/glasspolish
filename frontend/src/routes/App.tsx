import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { AllRoutesStr } from './constants'

export interface AppProps {
}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path={AllRoutesStr.Auth.root} component={Auth} />
      <Route path={AllRoutesStr.Dashboard.root} component={Dashboard} />
    </Switch>
  )
}

export default App
