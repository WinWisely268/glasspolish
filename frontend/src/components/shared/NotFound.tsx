import {Card, CardContent, Box, Typography} from '@material-ui/core'
import React from 'react'

export interface NotFoundProps {
    message?: string
}

const NotFound = (args: NotFoundProps) => {
    return (
        <Card>
            <CardContent>
                <Box alignItems='center' display='flex' flexDirection='column'>
                    <Typography color='textPrimary' gutterBottom variant='h3'>
                        {args.message !== undefined ? args.message : 'tidak ditemukan'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default NotFound
