import React, {useEffect} from 'react'

import Themer from '../providers/Themer'
import Footer from '../components/Footer'
import Header from '../components/Header'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import {
    useTheme,
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        },
        main: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(2)
        }
    })
)

export interface LayoutProps {
    title: string
    children: any
}

export const Layout: React.FunctionComponent<LayoutProps> = ({title, children}) => {
    const classes = useStyles(useTheme())

    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <Themer>
            <div className={classes.root}>
                <CssBaseline/>
                <Header/>
                <Container className={classes.main} maxWidth='sm'>
                    {children}
                </Container>
            </div>
            <Footer name='Alexander Adhyatma' linkUri='https://github.com/WinWisely268'/>
        </Themer>
    )
}

export default Layout
