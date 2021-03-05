import React from 'react'
import {Grid} from '@material-ui/core'

import {makeStyles, createStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
    createStyles({
        image: {
            backgroundImage: 'url(https://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/gridoto/2017/11/02/4045280123.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
    })
)

export interface RandomImageProps {
}

export const RandomImage: React.FunctionComponent<RandomImageProps> = () => {
    const classes = useStyles()
    return <Grid item xs={false} sm={4} md={6} className={classes.image}/>
}

export default RandomImage
