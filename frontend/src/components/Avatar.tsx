import React, { PropsWithChildren, ReactElement } from 'react'
import { ApolloError } from '@apollo/client'
import { Avatar, CircularProgress, Grid } from '@material-ui/core'
import SnackBar from './shared/Snackbar'
import UserAvatar from './dashboard/UserAvatar'
import { Maybe } from '../service/graphql'

interface HasPictureUrl {
  picture_url?: Maybe<String> | undefined
}

export interface AvatarComponentProps<T extends HasPictureUrl> {
  loading: boolean
  error: ApolloError | undefined
  setError: Function
  picture_urls: T[] | undefined
  avatarClass: string
}

export default function AvatarComponent<T extends HasPictureUrl>(props: PropsWithChildren<AvatarComponentProps<T>>): ReactElement {
  const defaultAvatarSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQm0wMf5sm27bsD0Z7DF9GsoRNjgLltS32iXQ&usqp=CAU'

  const errAvatar = () => {
    return <SnackBar variant={'error'} message={props.error?.message !== undefined ? props.error.message : ''}
                     setMessage={(msg) => props.setError(msg)} />
  }

  const avatarComponent = () => {
    if (props.loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {errAvatar()}
          <CircularProgress className={props.avatarClass} />
        </div>
      )
    } else {
      if (props.picture_urls === undefined) {
        return <Avatar className={props.avatarClass} src={defaultAvatarSrc} />
      } else {
        if (props.picture_urls.length > 0) {
          const ln = props.picture_urls.length == 1 ? 12 : 6
          return (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {props.picture_urls.map((p) => {
              let splitted = p.picture_url?.split('/')
              let fileName = splitted?.pop()
              let prefix = splitted?.join('/')
              return (
                // <Grid item md={ln} xs={12}>
                  <UserAvatar key={prefix} prefix={prefix as string} fileName={fileName as string}
                              avatarClass={props.avatarClass} />
                // </Grid>
              )
            })}
          </div>)
        } else {
          return <Avatar className={props.avatarClass} src={defaultAvatarSrc} />
        }
      }
    }
  }

  return (
    <React.Fragment>
      {errAvatar()}
      {avatarComponent()}
    </React.Fragment>
  )

}
