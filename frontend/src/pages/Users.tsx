import React, { useState } from 'react'
import { useStyles } from '../layouts/DashboardLayout'
import { NavLink, RouteProps, useRouteMatch } from 'react-router-dom'
import { useListAccountsQuery } from '../service/graphql'
import SnackBar from '../components/shared/Snackbar'
import SearchBar from '../components/SearchBar'
import { CircularProgress } from '@material-ui/core'

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
              <NavLink exact to={`${path}/detail/${item.user_id}`} className={classes.masterNavLink}
                       activeClassName={classes.activeMasterNavLink}>
                <div>
                  <div className={classes.inner}>
                    <h3 data-test='ListItemHeading'>
                      {item.profile?.name}
                    </h3>
                    <p>
                      {item.role}
                    </p>
                  </div>
                </div>
              </NavLink>
            </li>)}
          </ul>
        }
      </div>
    </React.Fragment>
  )
}

export default UsersPage