import React, { useEffect, useState } from 'react'
import { useStyles } from '../../layouts/DashboardLayout'
import { useInsertProductTagMutation, useUpdateProductTagMutation } from '../../service/graphql'
import { v4 } from 'uuid'
import { Box, Button, CircularProgress, Grid } from '@material-ui/core'
import { GenericField } from '../shared/GenericFormField'
import SnackBar from '../shared/Snackbar'

interface TagDetailsState {
  id: string,
  name: string,
  description: string,
}

interface TagNewProps {
  detailValues?: TagDetailsState
  update?: boolean
  refetchAction: Function
}


export const TagNew: React.FC<TagNewProps> = ({
                                                detailValues = { id: '', name: '', description: '' },
                                                update = false,
                                                refetchAction
                                              }) => {
  const classes = useStyles()
  const [
    insertTag,
    { loading: insertTagLoading, error: insertTagErr }
  ] = useInsertProductTagMutation()

  const [
    updateTag,
    { loading: updateTagLoading, error: updateTagError }
  ] = useUpdateProductTagMutation()

  const [values, setValues] = useState<TagDetailsState>({
    id: detailValues.id || v4(),
    name: detailValues.name,
    description: detailValues?.description
  })

  const [isButtonDisabled, setButtonDisable] = useState<boolean>(true)
  const [errMsg, setErrMsg] = useState('')
  const handleChangeName = (val: string) => {
    setValues({ ...values, name: val })
  }

  const handleChangeDesc = (val: string) => {
    setValues({ ...values, description: val })
  }

  const submitHandler = (e: any) => {
    e.preventDefault()
    if (update) {
      updateTag({
        variables: {
          tagId: values.id,
          name: values.name,
          description: values.description
        }
      })
        .catch((e) => {
          setErrMsg(e.message)
        })
    } else {
      insertTag({
        variables: {
          tagId: values.id,
          name: values.name,
          description: values.description
        }
      }).then((data) => {
        setValues({
          ...values
        })
        refetchAction()
      }).catch((e) => {
        setErrMsg(e.message)
      })
    }

  }

  useEffect(() => {
    setButtonDisable(
      !(
        values.id &&
        values.name &&
        values.description
      )
    )
  }, [values])


  return (<React.Fragment>
    <SnackBar
      variant='error'
      message={errMsg}
      setMessage={(message) => setErrMsg(insertTagErr != null ? insertTagErr.message : message)}
    />
    <SnackBar
      variant='error'
      message={errMsg}
      setMessage={(message) => setErrMsg(updateTagError != null ? updateTagError.message : message)}
    />
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
          validationFunc={() => true}
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

      <Box display='flex' justifyContent='space-around' p={4}>
        {insertTagLoading || updateTagLoading ? (
          <CircularProgress size={30} />
        ) : (
          <div>
            <Button
              className={classes.submitButton}
              color='primary'
              type='submit'
              disabled={isButtonDisabled}
              variant='contained'
            >
              Simpan
            </Button>
          </div>
        )}
      </Box>
    </form>
  </React.Fragment>)
}
