import {makeStyles} from '@material-ui/styles'
import React, {useEffect, useState} from 'react'
import {useMediaApi} from '../../service/media'
// import { User_Pictures } from '../../service/graphql'
import {Config} from '../../providers/Config'
import {Avatar, CircularProgress} from '@material-ui/core'

export interface UserAvatarProps {
    prefix: string
    fileName: string
}

const useStyles = makeStyles(() => ({
    avatar: {
        height: 100,
        width: 100
    }
}))

const UserAvatar: React.FC<UserAvatarProps> = ({prefix, fileName}) => {
    const classes = useStyles()

    const avatarDownloadReq = useMediaApi({
        initialUrl: Config.awsUploadEndpoint + '/download-url',
        initialData: {},
        requestOption: {
            file: fileName,
            prefix: prefix
        }
    })
    const defaultAvatarSrc =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQm0wMf5sm27bsD0Z7DF9GsoRNjgLltS32iXQ&usqp=CAU'

    const [avatarURL, setAvatarURL] = useState('')

    useEffect(() => {
        if (avatarDownloadReq.data) {
            setAvatarURL(avatarDownloadReq.data.url)
        } else if (avatarDownloadReq.isError) {
            console.log('error fetching download uri for user')
            setAvatarURL(defaultAvatarSrc)
        }
    }, [avatarDownloadReq])

    if (avatarDownloadReq.isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress className={classes.avatar}/>
            </div>
        )
    }
    return <Avatar className={classes.avatar} src={avatarURL}/>
}

export default UserAvatar
