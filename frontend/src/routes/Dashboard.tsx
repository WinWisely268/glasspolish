import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import UserProfile from '../pages/UserProfile'
import SettingsPage from '../components/profile/Settings'
import { ApolloProvider } from '@apollo/client'
import { authGQLClient } from '../providers/ApolloClient'
// import UsersPage from '../pages/UsersPage'
import { AllRoutesStr } from './constants'

export interface DashboardProps {
}

const DashboardAll: React.FC<DashboardProps> = () => {
  return (
    <React.Fragment>
      <ApolloProvider client={authGQLClient}>
        <Switch>
          <Route exact path={AllRoutesStr.Dashboard.root} component={Dashboard} />
          <Route exact path={AllRoutesStr.Dashboard.profile} component={UserProfile} />
          <Route exact path={AllRoutesStr.Dashboard.settings} component={SettingsPage} />
          {/*<Route exact path={AllRoutesStr.Dashboard.users} component={UsersPage}/>*/}
        </Switch>
      </ApolloProvider>
    </React.Fragment>
  )
}

export default DashboardAll
