import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import UserProfile from '../pages/UserProfile'
import SettingsPage from '../components/profile/Settings'
import { ApolloProvider } from '@apollo/client'
import { authGQLClient } from '../providers/ApolloClient'
import { AllRoutesStr } from './constants'
import TagPage, { TagDetails } from '../pages/TagPage'
import { MasterDetail } from '../components/MasterDetail'
import DashboardLayout from '../layouts/DashboardLayout'
import UsersPage from '../pages/Users'
import Products from '../pages/Products'

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
          <Route path={AllRoutesStr.Dashboard.tags}
                 render={props => (
                   <DashboardLayout>
                     <MasterDetail MasterType={TagPage} masterProps={{}}
                                   DetailType={TagDetails} detailProps={{}} />
                   </DashboardLayout>
                 )}
          />
          <Route path={AllRoutesStr.Dashboard.users}
                 render={props => (
                   <DashboardLayout>
                     <MasterDetail MasterType={UsersPage} masterProps={{}}
                                   DetailType={UsersPage} detailProps={{}} />
                   </DashboardLayout>
                 )}
          />
          <Route exact path={AllRoutesStr.Dashboard.products} component={Products} />
        </Switch>
      </ApolloProvider>
    </React.Fragment>
  )
}

export default DashboardAll
