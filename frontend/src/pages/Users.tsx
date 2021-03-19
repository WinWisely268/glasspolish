import React, { useState } from 'react'
import { useStyles } from '../layouts/DashboardLayout'
import { RouteProps, useParams, useRouteMatch } from 'react-router-dom'
import { useGetAccountQuery, useListAccountsQuery } from '../service/graphql'
import SnackBar from '../components/shared/Snackbar'
import SearchBar from '../components/SearchBar'
import { CircularProgress, Typography } from '@material-ui/core'
import MasterCard from '../components/shared/MasterCard'
import AvatarComponent from '../components/Avatar'
import CloseIcon from '@material-ui/icons/Close'
import UserAvatar from '../components/dashboard/UserAvatar'
import Details from '../components/shared/Details'

export interface UsersPageProps {
}

const UsersPage: React.FC<UsersPageProps> = () => {
  let { path } = useRouteMatch() as RouteProps
  const classes = useStyles()
  const [queryString, setQueryString] = useState<string>('%')
  const [lastLogin, setLastLogin] = useState<string>(new Date(0).toUTCString())
  const [errMsg, setErrMsg] = useState('')
  const {
    data: listAccountsData,
    loading: listAccountsLoading,
    error: listAccountsError,
    refetch: listAccountsRefetch
  } = useListAccountsQuery({
    variables: {
      lastLogin: lastLogin,
      name: queryString
    }
  })
  const handleSearch = () => {
    if (queryString !== '' && queryString.length > 2) {
      setTimeout(() => {
        listAccountsRefetch().catch((e) => {
          setErrMsg(e.message)
        })
      }, 300)
    }
  }

  const handleChangeSearchQuery = (s: string) => {
    if (s.length > 2) {
      setQueryString('%' + s + '%')
    }
  }

  return (
    <React.Fragment>
      <SnackBar
        variant='error'
        message={errMsg}
        setMessage={(msg: string) => setErrMsg(listAccountsError != null ? listAccountsError.message : msg)}
      />
      <div className={classes.content}>
        <SearchBar
          onSubmit={handleSearch}
          handleChangeQueryString={handleChangeSearchQuery}
          queryString={queryString}
        />
        {listAccountsLoading
          ? <ul className={classes.masterUl}>
            <CircularProgress className={classes.centerContainer} />
          </ul>
          : <ul className={classes.masterUl}>
            {listAccountsData?.accounts.map((item, idx) => <li key={item.user_id}>
              <MasterCard
                detailPath={`${path}/detail/${item.user_id}`}
                mediaContent={
                  <AvatarComponent loading={listAccountsLoading} error={listAccountsError} setError={setErrMsg}
                                   picture_urls={item.profile_pictures} avatarClass={classes.avatarSmall} />
                }
              >
                <h3 data-test='ListItemHeading'>
                  {item.profile?.name}
                </h3>
                <p>
                  Group: {item.role}
                </p>
              </MasterCard>
            </li>)}
          </ul>
        }
      </div>
    </React.Fragment>
  )
}

interface UserDetailsProps {

}

interface UserDetailsState {

}

export const UserDetailsPage: React.FC<UserDetailsProps> = (...props) => {
  const { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const {
    data,
    loading,
    error,
    refetch
  } = useGetAccountQuery({
    variables: {
      id
    }
  })

  const [errMsg, setErrMsg] = useState('')

  if (id === null || id === undefined) {
    return <Typography variant={'h4'} className={classes.notFound}>
      Tidak ada User yang dipilih
    </Typography>
  }

  return (
    <React.Fragment>
      <SnackBar variant='error' message={errMsg}
                setMessage={(message) => setErrMsg(error != null ? error.message : message)} />
      {
        loading
          ? <CircularProgress className={classes.center} />
          : <Details
            avatarComponent={
              <AvatarComponent 
                loading={loading} error={error} setError={setErrMsg}
                picture_urls={data?.accounts[0].profile_pictures} avatarClass={classes.avatar}
              />
            }
            details={new Map<string, string>(
             [
               ["Nama", data?.accounts[0]?.profile?.name || ''],
               ["Email", data?.accounts[0]?.email || ''],
               ["Grup", data?.accounts[0]?.role || ''],
               ["Login Terakhir", data?.accounts[0].last_login || '']
             ]
            )}
          />
      }
    </React.Fragment>
  )
}

export default UsersPage