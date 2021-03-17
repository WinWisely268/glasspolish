import React, { PropsWithChildren, ReactElement } from 'react'
import { ApolloError } from '@apollo/client'
import { Avatar, CircularProgress } from '@material-ui/core'
import SnackBar from './shared/Snackbar'
import UserAvatar from './dashboard/UserAvatar'

interface HasPictureUrl {
  picture_url: string
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
          return (<div>
            {props.picture_urls.map((p) => {
              let splitted = p.picture_url.split('/')
              let fileName = splitted?.pop()
              let prefix = splitted?.join('/')
              return (
                <UserAvatar key={prefix} prefix={prefix as string} fileName={fileName as string}
                            avatarClass={props.avatarClass} />
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
