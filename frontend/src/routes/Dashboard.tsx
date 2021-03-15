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
        </Switch>
      </ApolloProvider>
    </React.Fragment>
  )
}

export default DashboardAll
