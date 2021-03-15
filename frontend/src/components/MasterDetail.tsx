import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Theme } from '@material-ui/core/styles'
import { makeStyles, useTheme } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

export interface MasterDetailProps {
  MasterType: any,
  masterProps: any,
  DetailType: any,
  detailProps: any
}

const masterDetailStyles = makeStyles((theme: Theme = useTheme()) => createStyles({
    component: {
      display: 'flex',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    master: {
      width: '100%',
      maxWidth: '400px',
      height: '100%',
      position: 'relative',
      touchAction: 'pan-y',
      overflowY: 'auto',
      webkitOverflowScrolling: 'touch',
      willChange: 'scroll-position',
      overscrollBehavior: 'contain'
    },
    detail: {
      position: 'relative',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      touchAction: 'pan-y',
      overflowY: 'auto',
      webkitOverflowScrolling: 'touch',
      willChange: 'scroll-position',
      overscrollBehavior: 'contain'
    }
  })
)

export const MasterDetail: React.FC<MasterDetailProps> = (props) => {
  const styles = masterDetailStyles()
  const thm = useTheme()
  const isMedium = useMediaQuery(thm.breakpoints.down('md'))
  let { path } = useRouteMatch() as any
  const master = (
    <props.MasterType {...props.masterProps}
                      data-test='Master' />)
  const detail = (
    <props.DetailType {...props.detailProps}
                      data-test='Detail' />)

  return (
    isMedium ? (
      <Switch>
        <Route exact path={`${path}`}>
          {master}
        </Route>
        <Route path={`${path}/detail/:id`}>
          {detail}
        </Route>
      </Switch>
    ) : (
      <section className={styles.component}>
        <section className={styles.master}>
          <Route path={`${path}`}>
            {master}
          </Route>
        </section>
        <section className={styles.detail}>
          <Switch>
            <Route exact path={`${path}`}>
              {detail}
            </Route>
            <Route path={`${path}/detail/:id`}>
              {detail}
            </Route>
          </Switch>
        </section>
      </section>
    )
  )
}
