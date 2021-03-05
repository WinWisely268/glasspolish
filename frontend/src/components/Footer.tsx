import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import {
    useTheme,
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

function Copyright(props: FooterProps) {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {props.name + '™ '}
            <Link
                color='inherit'
                href={props.linkUri}>
                {props.name}
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            padding: theme.spacing(2),
            marginTop: 'auto',
            backgroundColor: '#f6f6f6'
        }
    })
)

export interface FooterProps {
    name: string
    linkUri: string
}

export const Footer: React.FunctionComponent<FooterProps> = ({
                                                                 ...props
                                                             }: FooterProps) => {
    const classes = useStyles(useTheme())
    return (
        <footer className={classes.footer}>
            <Container maxWidth='xl'>
                <Copyright {...props}/>
            </Container>
        </footer>
    )
}

export default Footer
