import React, { useEffect, useState } from 'react'
import SnackBar from '../components/shared/Snackbar'
import { useStyles } from '../layouts/DashboardLayout'
import { useGetProductTagQuery, useListProductTagsQuery } from '../service/graphql'
import { NavLink, useRouteMatch, useParams, RouteProps } from 'react-router-dom'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import SearchBar from '../components/SearchBar'
import DialogForm from '../components/shared/DialogForm'
import { TagNew } from '../components/tag/NewTag'

export interface TagPageProps {
}

const TagPage: React.FC<TagPageProps> = () => {
  let { path } = useRouteMatch() as RouteProps
  const classes = useStyles()
  const [queryString, setQueryString] = useState<string>('%')
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
  const handleSearch = () => {
    if (queryString !== '' && queryString.length > 2) {
      setTimeout(() => {
        listTagsRefetch().catch((e) => {
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
        setMessage={(message) => setErrMsg(listTagsError != null ? listTagsError.message : message)}
      />
      <div className={classes.content}>
        <DialogForm title={'Tambah Tag Baru'} content={<TagNew refetchAction={() => listTagsRefetch()} />} />
        <SearchBar
          onSubmit={handleSearch}
          handleChangeQueryString={handleChangeSearchQuery}
          queryString={queryString}
        />
        {listTagsLoading
          ? <ul className={classes.masterUl}>
            <CircularProgress className={classes.centerContainer} />
          </ul>
          : <ul className={classes.masterUl}>
            {listTagsData?.product_tags.map((item, idx) => <li key={item.id}>
              <NavLink exact to={`${path}/detail/${item.id}`} className={classes.masterNavLink}
                       activeClassName={classes.activeMasterNavLink}>
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
        }
      </div>
    </React.Fragment>
  )
}

interface TagDetailsProps {
}

interface TagDetailsState {
  id: string,
  name: string,
  description: string,
  created_at: any,
  updated_at: any,
}

export const TagDetails: React.FC<TagDetailsProps> = (props) => {
  const { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const [values, setValues] = useState<TagDetailsState>({
    id: '',
    name: '',
    description: '',
    created_at: undefined,
    updated_at: undefined
  })

  const [isButtonDisabled, setButtonDisable] = useState<boolean>(true)
  const [errMsg, setErrMsg] = useState('')
  const {
    data,
    loading: getTagLoading,
    error: getTagError,
    refetch: getTagRefetch
  } = useGetProductTagQuery({
    variables: {
      tagId: id
    }
  })

  useEffect(() => {
    if (data !== null) {
      setValues({
        id: data?.product_tags[0].id,
        name: data?.product_tags[0].name || '',
        description: data?.product_tags[0].description || '',
        created_at: data?.product_tags[0].created_at,
        updated_at: data?.product_tags[0].updated_at
      })
    }
  }, [data])

  useEffect(() => {
    setButtonDisable(
      !(
        values.id,
          values.name,
          values.description
      )
    )
  }, [values])

  if (id === null || id === undefined) {
    return <Typography variant={'h4'} className={classes.notFound}>
      Tidak ada tag yang dipilih
    </Typography>
  }

  return (
    <React.Fragment>
      <SnackBar variant='error' message={errMsg}
                setMessage={(message) => setErrMsg(getTagError != null ? getTagError.message : message)} />
      {getTagLoading ? <CircularProgress className={classes.notFound} /> : <div className={classes.content}>
        <Box display='flex' justifyContent='flex-end' p={4}>
          <Button
            color='secondary'
            className={classes.submitButton}
            type='submit'
            disabled={isButtonDisabled}
            variant='contained'
          >
            Hapus
          </Button>
          <DialogForm title={'Edit'} content={<TagNew refetchAction={() => {
            getTagRefetch()
          }} update={true}
                                                      detailValues={{
                                                        id: values.id,
                                                        name: values.name,
                                                        description: values.description
                                                      }} />} />
        </Box>
        <Typography variant={'h4'} className={classes.center}>
          {values.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.center} gutterBottom>
          {values.description}
        </Typography>

      </div>}
    </React.Fragment>
  )
}


export default TagPage