import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CardActions,
  Divider,
  CircularProgress
} from '@material-ui/core'
import { createStyles, makeStyles, useTheme } from '@material-ui/styles'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { useGetProfilePictureQuery, Profiles, Maybe } from '../../service/graphql'
import SnackBar from '../shared/Snackbar'
import UploadButton from '../dashboard/UploadButton'
import UserAvatar from '../dashboard/UserAvatar'
import { v4, parse as uuidParse, stringify as uuidStrfy } from 'uuid'

export interface UserProfileDisplayProps {
  profile: Pick<Profiles,
    | 'locked'
    | 'name'
    | 'created_at'
    | 'updated_at'>
  accountId: string
  role: String
}

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}))

const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({
                                                                 profile,
                                                                 role,
                                                                 accountId
                                                               }) => {
  const accountIdUuidBytes = uuidParse(accountId)
  const accountUuidStrfied = uuidStrfy(accountIdUuidBytes)
  const classes = useStyles()
  const {
    data: avatarData,
    loading: avatarLoading,
    error: avatarError
  } = useGetProfilePictureQuery({
    variables: {
      id: accountId
    }
  })
  const [avatarErrMsg, setAvatarErrMsg] = useState('')
  const defaultAvatarSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQm0wMf5sm27bsD0Z7DF9GsoRNjgLltS32iXQ&usqp=CAU'

  const avatarComponent = () => {
    if (avatarLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress className={classes.avatar} />
        </div>
      )
    } else if (avatarError) {
      return (
        <SnackBar
          variant='error'
          message={avatarError.message}
          setMessage={(msg: React.SetStateAction<string>) => setAvatarErrMsg(msg)}
        />
      )
    } else {
      if (avatarData?.profile_pictures === undefined) {
        return <Avatar className={classes.avatar} src={defaultAvatarSrc} />
      } else {
        if (avatarData.profile_pictures.length > 0) {
          let primary: Maybe<string>
          avatarData.profile_pictures.forEach((p) =>
            primary = p.primary ? p.picture_url! : avatarData.profile_pictures[0]!.picture_url!
          )
          let splitted = primary!.split('/')
          let fileName = splitted?.pop()
          let prefix = splitted?.join('/')

          return (
            <UserAvatar
              prefix={prefix as string}
              fileName={fileName as string}
            />
          )
        } else {
          return <Avatar className={classes.avatar} src={defaultAvatarSrc} />
        }
      }
    }
  }
  return (
    <Card className={cx(classes.root)}>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          {avatarComponent()}
          <Typography color='textPrimary' gutterBottom variant='h6'>
            {profile.name}
          </Typography>
          <Typography color='textSecondary' variant='subtitle1'>
            {role.toUpperCase()}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {avatarData?.profile_pictures[0] !== undefined ? (
          <UploadButton
            accountId={accountUuidStrfied}
            tableName='profile_pictures'
            tableFieldName='picture_url'
            id={avatarData.profile_pictures[0].id}
            uploadMetadata={{ width: 300, height: 300 }}
          />
        ) : (
          <UploadButton
            accountId={accountUuidStrfied}
            id={v4().toString()}
            tableName='profile_pictures'
            tableFieldName='picture_url'
            uploadMetadata={{ width: 300, height: 300 }}
          />
        )}
      </CardActions>
    </Card>
  )
}

export default UserProfileDisplay
