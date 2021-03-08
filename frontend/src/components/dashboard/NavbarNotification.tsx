import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import IconNotifications from '@material-ui/icons/Notifications'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const notifications = [
  {
    user: {
      name: 'Test Notification',
      image: 'https://material-ui.com/static/images/avatar/1.jpg'
    },
    title: 'Sales A Absen',
    content: ' Sales A menghilang....'
  }
]

const NavbarNotifications = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div className={classes.headerNotifications}>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='Search'
        className={classes.button}
        aria-controls='NavbarNotifications'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <Badge
          badgeContent={notifications.length}
          color='secondary'
          classes={{ badge: classes.badge }}
        >
          <IconNotifications />
        </Badge>
      </IconButton>
      <Menu
        id='NavbarNotifications'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{ paper: classes.notifications }}
      >
        <List className={classes.notifications}>
          {notifications.map((notification, index) => (
            <ListItem button alignItems='flex-start' key={index}>
              <ListItemAvatar>
                <Avatar
                  alt={notification.user.name}
                  src={notification.user.image}
                />
              </ListItemAvatar>
              <ListItemText
                primary={notification.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'
                    >
                      {notification.user.name}
                    </Typography>
                    {notification.content}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Menu>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  headerNotifications: {
    marginRight: 18
  },
  notificationsContainer: {
    // position: 'relative',
  },
  button: {},
  badge: {
    color: '#fff'
  },
  notifications: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}))

export default NavbarNotifications
