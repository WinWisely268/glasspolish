import React, {useContext, useEffect, useState} from 'react'
import cx from 'classnames'

import {Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles'
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
import {AuthContext} from '../../providers/AuthProvider'
import * as H from 'history'

interface NavbarProfileProps {
    history: H.History<H.LocationState>
}

const NavbarProfile: React.FC<NavbarProfileProps> = ({history}) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [userName, setUserName] = useState<string>()
    const [userPicture, setUserPicture] = useState<string>()
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if (authContext.user !== null) {
            setUserName(authContext.email.split('@')[0])
        }
    }, [authContext])

    if (authContext.user === null) {
        return <div className={cx('headerProfile', classes.headerProfile)}/>
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
                <Avatar
                    className={classes.profileAvatar}
                    alt={userName}
                    src={userPicture}
                />
                <span className={classes.profileName}>{userName}</span>
                <IconArrowDropDown/>
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
                    to='/dashboard/profile'
                >
                    <ListItemIcon>
                        <IconProfile/>
                    </ListItemIcon>
                    <ListItemText primary='My Profile'/>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/dashboard/settings'
                >
                    <ListItemIcon>
                        <IconSettings/>
                    </ListItemIcon>
                    <ListItemText primary='Settings'/>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={signOutHandler} component={Link} to='/'>
                    <ListItemIcon>
                        <IconLogout/>
                    </ListItemIcon>
                    <ListItemText primary='Logout'/>
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
