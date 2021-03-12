import React, { useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'

import IconArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconProfile from '@material-ui/icons/AccountBox'
import IconSettings from '@material-ui/icons/Settings'
import IconLogout from '@material-ui/icons/ExitToApp'
import { AuthContext } from '../../providers/AuthProvider'
import * as H from 'history'
import { AllRoutesStr } from '../../routes/constants'
import UserAvatar from './UserAvatar'
import { Maybe, useGetProfilePictureQuery } from '../../service/graphql'
import { CircularProgress } from '@material-ui/core'
import SnackBar from '../shared/Snackbar'

interface NavbarProfileProps {
  history: H.History<H.LocationState>
}

const NavbarProfile: React.FC<NavbarProfileProps> = ({ history }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [userName, setUserName] = useState<string>()
  const authContext = useContext(AuthContext)
  const [accountId, setAccountId] = useState<string>('')

  const [avatarErrMsg, setAvatarErrMsg] = useState('')
  const defaultAvatarSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQm0wMf5sm27bsD0Z7DF9GsoRNjgLltS32iXQ&usqp=CAU'


  const {
    data: avatarData,
    loading: avatarLoading,
    error: avatarError,
    refetch
  } = useGetProfilePictureQuery({
    variables: {
      id: accountId
    }
  })

  useEffect(() => {
    if (authContext.user !== null) {
      setUserName(authContext.email.split('@')[0])
      setAccountId(authContext.user.getUsername())
      refetch()
    }
  }, [authContext])

  if (authContext.user === null) {
    return <div className={cx('headerProfile', classes.headerProfile)} />
  }


  const signOutHandler = () => {
    authContext
      .signOut()
      .then((data) => {
        history.push('/')
      })
      .catch((err) => {
        console.log('error sign out')
      })
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const avatarComponent = () => {
    if (avatarLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress className={classes.profileAvatar} />
        </div>
      )
    } else if (avatarError) {
      return (
        <SnackBar
          variant='error'
          message={avatarError.message}
          setMessage={(msg: React.SetStateAction<string>) => setAvatarErrMsg(msg)}
        />
      )
    } else {
      if (avatarData?.profile_pictures === undefined) {
        return <Avatar className={classes.profileAvatar} src={defaultAvatarSrc} />
      } else {
        if (avatarData.profile_pictures.length > 0) {
          let primary: Maybe<string>
          avatarData.profile_pictures.forEach((p) =>
            primary = p.primary ? p.picture_url! : avatarData.profile_pictures[0]!.picture_url!
          )
          let splitted = primary!.split('/')
          let fileName = splitted?.pop()
          let prefix = splitted?.join('/')

          return (
            <UserAvatar
              avatarClass={classes.profileAvatar}
              prefix={prefix as string}
              fileName={fileName as string}
            />
          )
        } else {
          return <Avatar className={classes.profileAvatar} src={defaultAvatarSrc} />
        }
      }
    }
  }

  return (
    <div className={cx('headerProfile', classes.headerProfile)}>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='Search'
        className={classes.profileButton}
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        {avatarComponent()}
        <span className={classes.profileName}>{userName}</span>
        <IconArrowDropDown />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        classes={{
          paper: classes.profileMenu
        }}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={AllRoutesStr.Dashboard.profile}
        >
          <ListItemIcon>
            <IconProfile />
          </ListItemIcon>
          <ListItemText primary='My Profile' />
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={AllRoutesStr.Dashboard.settings}
        >
          <ListItemIcon>
            <IconSettings />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOutHandler} component={Link} to='/'>
          <ListItemIcon>
            <IconLogout />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </MenuItem>
      </Menu>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  headerProfile: {
    display: 'inline-flex'
  },
  profileButton: {
    borderRadius: 30,
    fontSize: '1.0rem',
    padding: 8
  },
  profileAvatar: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  profileName: {
    fontWeight: 500,
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  profileMenu: {
    marginLeft: '-16px'
  }
}))

export default NavbarProfile
