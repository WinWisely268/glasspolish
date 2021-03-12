import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid
} from '@material-ui/core'
import { CardHeader, Divider } from '@material-ui/core'
import { useUpsertProfileMutation, Profiles } from '../../service/graphql'
import { GenericField } from '../shared/GenericFormField'
import {
  validateName
} from '../../utilities/validators'
import SnackBar from '../shared/Snackbar'

const useStyles = makeStyles(() => ({
  root: {}
}))

export interface UserProfileFormProps {
  profile:
    | Pick<Profiles,
    | 'locked'
    | 'name'
    | 'created_at'
    | 'updated_at'>
    | undefined
  accountId: string
  className: string
}

interface UserFormState {
  name: string
  accountId: string
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
                                                           accountId,
                                                           className,
                                                           profile
                                                         }) => {
  const classes = useStyles()
  const [
    upsertProfile,
    { loading: upsertProfileLoading, error: upsertProfileErr }
  ] = useUpsertProfileMutation()

  const [isButtonDisabled, setButtonDisable] = useState<boolean>(true)

  const [values, setValues] = useState<UserFormState>({
    name: '',
    accountId: accountId
  })

  useEffect(() => {
    if (profile !== undefined) {
      setValues({
        name: profile.name,
        accountId: accountId
      })
    }
  }, [profile, accountId])

  useEffect(() => {
    setButtonDisable(
      !(
        values.name
      )
    )
  }, [values])

  const handleChangeName = (val: string) => {
    setValues({ ...values, name: val })
  }

  const submitHandler = (e: any) => {
    e.preventDefault()
    upsertProfile({
      variables: {
        name: values.name,
        accountId: accountId
      }
    })
      .then((data) => {
        setValues({
          ...values
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div>
      <SnackBar
        variant='error'
        message={upsertProfileErr?.message ? upsertProfileErr?.message : ''}
        setMessage={(message) => console.log(message)}
      />
      <form
        autoComplete='off'
        noValidate
        onSubmit={(e) => submitHandler(e)}
        className={cx(classes.root, className)}
      >
        <Card>
          <CardHeader
            subheader=''
            title='Nama anda'
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <GenericField
                  inputType='text'
                  placeholderValue={values.name}
                  isRequired={true}
                  setField={handleChangeName}
                  validationFunc={validateName}
                  messages={{
                    id: 'userName',
                    label: 'Nama',
                    autoComplete: 'false',
                    name: 'Nama',
                    invalidInput: 'Nama Invalid'
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display='flex' justifyContent='flex-end' p={2}>
            {upsertProfileLoading ? (
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
        </Card>
      </form>
    </div>
  )
}

export default UserProfileForm
