import React, {useContext, useMemo} from 'react'
import {useHistory} from 'react-router-dom'

import {
    Grid,
    Container,
    CssBaseline,
    Paper,
    Typography,
    // Divider,
    Link
} from '@material-ui/core'

import logo from '../static/logo.png'
import EmailSignIn from '../components/EmailSignIn'
// import GoogleSignIn from '../auth/GoogleSignIn'
import Button from '@material-ui/core/Button'
import {AuthContext} from '../providers/AuthProvider'
import AppImage from '../components/HomeImage'
import Layout from '../layouts/HomeLayout'

import {
    useTheme,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            minHeight: '100vh'
        },
        paper: {
            margin: theme.spacing(2),
            marginBottom: theme.spacing(12),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center'
        },
        link1: {
            margin: theme.spacing(3, 0, 0, 0)
        },
        link2: {
            margin: theme.spacing(2, 0, 0, 0)
        },
        logo: {
            float: 'left',
            height: '240px',
            // marginBottom: theme.spacing(1)
        },
        hr: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(1),
            width: '100%',
            maxWidth: '260px'
        }
    })
)

export interface HomeProps {
}

const Home: React.FunctionComponent<HomeProps> = () => {
    const authContext = useContext(AuthContext)
    const history = useHistory()
    const classes = useStyles(useTheme())

    const appImage = useMemo(() => <AppImage/>, [])

    const dashLink = authContext.isAuthenticated() ? (
        <React.Fragment>
            <Button
                fullWidth
                color='secondary'
                variant='outlined'
                size='large'
                onClick={() => history.push('/dashboard')}
                className={classes.link1}>
                Go to Dashboard
            </Button>
            <Button
                fullWidth
                color='primary'
                variant='outlined'
                size='large'
                onClick={() => authContext.signOut()}
                className={classes.link2}>
                {`Sign Out ${authContext.provider}`}
            </Button>
        </React.Fragment>
    ) : null

    const federatedSignIn = !authContext.isAuthenticated() ? (
        <React.Fragment>
            <EmailSignIn/>
            {/* <div className={classes.hr}>
        <Divider />
      </div> */}
            {/* <GoogleSignIn /> */}
        </React.Fragment>
    ) : null

    return (
        <Grid container component='main' className={classes.root}>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <Layout title='Dashboard'>
                    <CssBaseline/>
                    <Container maxWidth='xs'>
                        <div className={classes.paper}>
                            <img alt='logo' className={classes.logo} src={logo}/>
                            <Typography variant='h5' gutterBottom>
                                GlassPolish™
                            </Typography>
                            <Typography variant='subtitle1' gutterBottom>
                                <Link href='https://glasspolish.store'>
                                    Visit Site
                                </Link>
                            </Typography>
                            {dashLink}
                            {federatedSignIn}
                        </div>
                    </Container>
                </Layout>
            </Grid>
            {appImage}
        </Grid>
    )
}

export default Home
