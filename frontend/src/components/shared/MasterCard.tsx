import React from 'react'
import { NavLink } from 'react-router-dom'
import { useStyles } from '../../layouts/DashboardLayout'
import { Grid } from '@material-ui/core'


export interface MasterCardProps {
  detailPath: string,
  mediaContent?: JSX.Element
  controlContent?: JSX.Element
}

export const MasterCard: React.FC<MasterCardProps> = ({ ...props }) => {
  const classes = useStyles()
  const calcContentSize = () => props.mediaContent !== undefined && props.controlContent !== undefined ? 6 : 8

  return (
    <div className={classes.masterNavLink}>
      <Grid container spacing={1}>
        {props.mediaContent !== undefined && <Grid item xs={3}>
          {props.mediaContent}
        </Grid>}
        <Grid item xs={calcContentSize()} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <NavLink exact to={props.detailPath}>
              {props.children}
            </NavLink>
          </Grid>
        </Grid>
        {props.controlContent !== undefined && <Grid item xs={3}>
          {props.controlContent}
        </Grid>}
      </Grid>
    </div>
  )
}

export default MasterCard