import React from 'react'
import { useStyles } from '../../layouts/DashboardLayout'
import Typography from '@material-ui/core/Typography'

interface DetailsProp {
  details?: Map<string, string | undefined>
  avatarComponent?: JSX.Element
}

export const Details: React.FC<DetailsProp> = ({details, avatarComponent, children}) => {
  const classes = useStyles()
  let elements: JSX.Element[] = []
  if (details !== undefined) {
    details.forEach((v, k) => {
      elements.push(
        <div className={classes.masterNavLink}>
          <Typography variant={'body1'} style={{fontWeight: 'bold'}}>
            {k}:
          </Typography>
          <Typography variant='caption' color={'textSecondary'} component={'p'} gutterBottom>
            {v}
          </Typography>
        </div>
      )
    })
  }

  return (
    <div className={classes.content}>
      {avatarComponent !== undefined && avatarComponent}
      {elements}
      {children}
    </div>
  )
}

export default Details