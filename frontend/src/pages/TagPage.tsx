import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import SnackBar from '../components/shared/Snackbar'
import DashboardLayout, { useStyles } from '../layouts/DashboardLayout'
import { useListProductTagsQuery } from '../service/graphql'
import { LinearProgress, Link } from '@material-ui/core'
import { MasterDetail } from '../components/MasterDetail'
import { NavLink} from 'react-router-dom'

export interface TagPageProps {
}

const TagPage: React.FC<TagPageProps> = () => {
  const classes = useStyles()
  const [queryString, setQueryString] = useState<string>('%')
  const authCtx = useContext(AuthContext)
  const [errMsg, setErrMsg] = useState('')
  const {
    data: listTagsData,
    loading: listTagsLoading,
    error: listTagsError,
    refetch: listTagsRefetch
  } = useListProductTagsQuery({
    variables: {
      query: queryString
    }
  })
  useEffect(() => {
    if (queryString !== '' && queryString.length > 2) {
      setTimeout(() => {
        listTagsRefetch()
      }, 300)
    }
  }, [queryString])

  if (listTagsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LinearProgress />
      </div>
    )
  } else {
    const masterComponent = () => (
      <ul>
        {listTagsData?.product_tags.map((item, idx) => <li key={item.id}>
          <NavLink exact to={`/dashboard/products/tags/details/${item.id}`}>
            <div>
              <div className={classes.inner}>
                <h2 data-test='ListItemHeading'>
                  {item.name}
                </h2>
                <p>
                  {item.description}
                </p>
              </div>
            </div>
          </NavLink>
        </li>)}
      </ul>
    )
    const detailComponent = () => (
      <p>
        Details
      </p>
    )
    return (
      <DashboardLayout>
        <SnackBar
          variant='error'
          message={errMsg}
          setMessage={(message) => setErrMsg(listTagsError != null ? listTagsError.message : message)}
        />
        <MasterDetail MasterType={masterComponent} masterProps={{}} DetailType={detailComponent} detailProps={{}} />
      </DashboardLayout>
    )
  }
}

export default TagPage