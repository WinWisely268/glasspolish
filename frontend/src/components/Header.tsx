import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {
    useTheme,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles'

import {Toolbar, AppBar, IconButton, Button} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import {AuthContext} from '../providers/AuthProvider'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {boxShadow: 'none', backgroundColor: 'transparent'},
        menuButton: {
            marginRight: theme.spacing(2),
        },
        spacer: {
            flexGrow: 1,
        },
    })
)

export interface HeaderProps {
}

export const Header: React.FunctionComponent<HeaderProps> = () => {
    const classes = useStyles(useTheme())
    const authContext = useContext(AuthContext)
    const history = useHistory()

    let authLink = authContext.isAuthenticated() ? (
        <Button color="primary" onClick={() => authContext.signOut()}>
            Sign Out
        </Button>
    ) : null

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    onClick={() => history.push('/')}
                    color="inherit"
                    aria-label="home"
                >
                    <HomeIcon color="action"/>
                </IconButton>
                <div className={classes.spacer}/>
                {authLink}
            </Toolbar>
        </AppBar>
    )
}

export default Header
