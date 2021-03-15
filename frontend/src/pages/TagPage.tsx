import React, { useContext, useEffect, useState } from 'react'
import SnackBar from '../components/shared/Snackbar'
import DashboardLayout, { useStyles } from '../layouts/DashboardLayout'
import { useGetProductTagQuery, useListProductTagsQuery, useUpsertProductTagMutation } from '../service/graphql'
import { NavLink, useRouteMatch, useParams, RouteProps } from 'react-router-dom'
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, Grid } from '@material-ui/core'
import { v4 } from 'uuid'
import { GenericField } from '../components/shared/GenericFormField'
import { validateName } from '../utilities/validators'

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
  useEffect(() => {
    if (queryString !== '' && queryString.length > 2) {
      setTimeout(() => {
        listTagsRefetch()
      }, 300)
    }
  }, [queryString])

  return (
    <React.Fragment>
      <SnackBar
        variant='error'
        message={errMsg}
        setMessage={(message) => setErrMsg(listTagsError != null ? listTagsError.message : message)}
      />
      {listTagsLoading
        ? <ul>
          <CircularProgress className={classes.centerContainer} />
        </ul>
        : <ul>
          {listTagsData?.product_tags.map((item, idx) => <li className={classes.masterLink} key={item.id}>
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
  const [
    upsertTag,
    { loading: upsertTagLoading, error: upsertTagErr }
  ] = useUpsertProductTagMutation()

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

  const handleChangeName = (val: string) => {
    setValues({ ...values, name: val })
  }

  const handleChangeDesc = (val: string) => {
    setValues({ ...values, description: val })
  }

  const submitHandler = (e: any) => {
    e.preventDefault()
    upsertTag({
      variables: {
        tagId: values.id || v4(),
        name: values.name,
        description: values.description
      }
    }).then((data) => {
      setValues({
        ...values
      })
    }).catch((e) => {
      setErrMsg(e.message)
    })
  }

  return (
    <React.Fragment>
      <SnackBar variant='error' message={errMsg}
                setMessage={(message) => setErrMsg(getTagError != null ? getTagError.message : message)} />
      {getTagLoading ? <CircularProgress /> : <div className={classes.content}>
        <form
          autoComplete='off'
          noValidate
          onSubmit={(e) => submitHandler(e)}
        >
          <Grid container spacing={1}>
            <GenericField
              inputType='text'
              placeholderValue={values.name}
              isRequired={true}
              setField={handleChangeName}
              validationFunc={validateName}
              messages={{
                id: 'tagName',
                label: 'Nama Tag',
                autoComplete: 'false',
                name: 'TagName',
                invalidInput: 'Tag Invalid'
              }}
            />
            <GenericField
              inputType='text'
              placeholderValue={values.description}
              isRequired={true}
              setField={handleChangeDesc}
              validationFunc={() => true}
              messages={{
                id: 'tagDesc',
                label: 'Deskripsi Tag',
                autoComplete: 'false',
                name: 'TagDesc',
                invalidInput: 'Deskripsi Invalid'
              }}
            />
          </Grid>

          <Box display='flex' justifyContent='flex-end' p={2}>
            {upsertTagLoading ? (
              <CircularProgress size={30} />
            ) : (
              <Button
                color='primary'
                type='submit'
                disabled={isButtonDisabled}
                variant='contained'
              >
                Simpan
              </Button>
            )}
          </Box>
        </form>
      </div>}
    </React.Fragment>
  )
}

export default TagPage