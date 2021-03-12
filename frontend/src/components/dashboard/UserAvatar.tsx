import React, { useEffect, useState } from 'react'
import { useMediaApi } from '../../service/media'
import { Config } from '../../providers/Config'
import { Avatar, CircularProgress } from '@material-ui/core'

export interface UserAvatarProps {
  prefix: string
  fileName: string
  avatarClass: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ prefix, fileName, avatarClass }) => {
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress className={avatarClass} />
      </div>
    )
  }
  return <Avatar className={avatarClass} src={avatarURL} />
}

export default UserAvatar
