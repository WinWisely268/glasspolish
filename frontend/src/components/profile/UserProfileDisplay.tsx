import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import React, { useState } from 'react'
import { useGetProfilePictureQuery, Profiles } from '../../service/graphql'
import UploadButton from '../dashboard/UploadButton'
import { v4, parse as uuidParse, stringify as uuidStrfy } from 'uuid'
import AvatarComponent from '../Avatar'

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
    error: avatarError,
    refetch
  } = useGetProfilePictureQuery({
    variables: {
      id: accountId
    }
  })
  const [avatarErrMsg, setAvatarErrMsg] = useState('')

  return (
    <Card className={cx(classes.root)}>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <AvatarComponent loading={avatarLoading} error={avatarError} setError={setAvatarErrMsg}
                           picture_urls={avatarData?.profile_pictures} avatarClass={classes.avatar} />
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
            onUploadDone={() => refetch()}
            accountId={accountUuidStrfied}
            tableName='profile_pictures'
            tablePrimaryField='account_id'
            tableFieldName='picture_url'
            id={avatarData.profile_pictures[0].id}
            uploadMetadata={{ width: 300, height: 300 }}
          />
        ) : (
          <UploadButton
            onUploadDone={() => refetch()}
            accountId={accountUuidStrfied}
            id={v4().toString()}
            tableName='profile_pictures'
            tableFieldName='picture_url'
            tablePrimaryField='account_id'
            uploadMetadata={{ width: 300, height: 300 }}
          />
        )}
      </CardActions>
    </Card>
  )
}

export default UserProfileDisplay
