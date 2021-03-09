import { Typography } from '@material-ui/core'
import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import withAuthenticator from '../../providers/withAuthenticator'

export interface AppSettingsPageProps {
}

const AppSettingsPage: React.FC<AppSettingsPageProps> = () => {
  return (
    <DashboardLayout>
      <div>
        <Typography variant='h5' gutterBottom>
          Application Settings
        </Typography>
      </div>
    </DashboardLayout>
  )
}

export default withAuthenticator(AppSettingsPage)