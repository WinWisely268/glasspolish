import React, { useEffect } from 'react'
import cx from 'classnames'
import { Paper, Grid } from '@material-ui/core'

import withAuthenticator from '../providers/withAuthenticator'
import DashboardLayout, { useStyles } from '../layouts/DashboardLayout'

export interface DashboardProps {
}

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  useEffect(() => {
    document.title = 'GlassPolish Dashboard'
  }, [])

  const classes = useStyles()

  const fixedHeightPaper = cx(classes.paper, classes.fixedHeight)

  const dashboardPage = () => (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            {/*<Chart />*/}
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            {/*<Deposits />*/}
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {/*<Orders />*/}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )

  return <DashboardLayout children={dashboardPage()} />
}

export default withAuthenticator(Dashboard)
