import React from 'react'

import Button from '@material-ui/core/Button'
import { useStyles } from './styles'
import { CircularProgress } from '@material-ui/core'

export interface AuthButtonProps {
  children: any
  disabled: boolean
  loading: boolean
}

export const AuthButton: React.FunctionComponent<AuthButtonProps> = ({ children, disabled, loading }) => {
  const classes = useStyles()

  const actualButton = () => {
    if (disabled) {
      return <Button
        type='submit'
        disabled={disabled}
        fullWidth
        variant='contained'
        size='large'
        className={classes.submit}>
        color={'secondary'}
        {children}
      </Button>
    } else {
      return <Button
        type='submit'
        disabled={disabled}
        fullWidth
        variant='contained'
        color={'primary'}
        size='large'
        className={classes.submit}>
        {children}
      </Button>
    }

  }

  return loading ? (
      <div>
        {actualButton()}
        <CircularProgress />
      </div>
    )
    : actualButton()
}

export default AuthButton
