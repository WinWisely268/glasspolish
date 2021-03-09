import { Grid, LinearProgress } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useGetAccountQuery } from '../service/graphql'
import { AuthContext } from '../providers/AuthProvider'
import SnackBar from '../components/shared/Snackbar'
import DashboardLayout from '../layouts/DashboardLayout'
import UserProfileDisplay from '../components/profile/UserProfileDisplay'
import UserProfileForm from '../components/profile/UserProfileForm'
import NotFound from '../components/shared/NotFound'

export interface UserProfileProps {
}

const UserProfilePage: React.FC<UserProfileProps> = () => {
  const authCtx = useContext(AuthContext)
  const {
    data: getAccountDetailsData,
    loading: getAccountDetailsLoading,
    error: getAccountDetailsError
  } = useGetAccountQuery({
    variables: {
      id: authCtx.user !== null ? authCtx.user.getUsername() : ''
    }
  })
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (getAccountDetailsError !== undefined) {
      setErrMsg(getAccountDetailsError.message)
    }
  }, [getAccountDetailsError])

  if (getAccountDetailsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LinearProgress />
      </div>
    )
  } else if (errMsg !== '') {
    return (
      <SnackBar
        variant='error'
        message={errMsg}
        setMessage={(message) => setErrMsg(errMsg)}
      />
    )
  } else {
    return (
      <DashboardLayout>
        <div>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              {getAccountDetailsData?.accounts[0].profile !== null &&
              getAccountDetailsData?.accounts[0].profile !== undefined ? (
                <UserProfileDisplay
                  accountId={authCtx.user?.getUsername() || ''}
                  profile={getAccountDetailsData.accounts[0].profile}
                  role={getAccountDetailsData.accounts[0].role}
                />
              ) : (
                <NotFound message={'profile tidak ditemukan'} />
              )}
            </Grid>
            <Grid item xl={9} lg={9} md={6} sm={12} xs={12}>
              {getAccountDetailsData?.accounts[0].profile !== null &&
              getAccountDetailsData?.accounts[0].profile !== undefined ? (
                <UserProfileForm
                  accountId={authCtx.user?.getUsername() || ''}
                  className={'user-profile-form'}
                  profile={getAccountDetailsData?.accounts[0].profile}
                />
              ) : (
                <UserProfileForm
                  accountId={authCtx.user?.getUsername() || ''}
                  className={'user-profile-form'}
                  profile={undefined}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    )
  }
}

export default UserProfilePage
