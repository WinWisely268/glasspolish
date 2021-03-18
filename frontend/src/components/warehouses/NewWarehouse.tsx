import React, { useEffect, useState } from 'react'
import { useInsertWarehouseMutation, useUpdateWarehouseMutation, Warehouses } from '../../service/graphql'
import { useStyles } from '../../layouts/DashboardLayout'
import { v4 } from 'uuid'
import SnackBar from '../shared/Snackbar'
import { GenericField } from '../shared/GenericFormField'
import { Box, Button, CircularProgress } from '@material-ui/core'

interface NewWarehouseProps {
  existing?: Warehouses
  update?: boolean
  refetchAction: Function
}

export const NewWarehouse: React.FC<NewWarehouseProps> = ({
                                                            existing,
                                                            update = false,
                                                            refetchAction
                                                          }) => {
  const classes = useStyles()
  const [insertWh, { loading: insertWhLoading, error: insertWhError }] = useInsertWarehouseMutation()
  const [updateWh, { loading: updateWhLoading, error: updateWhError }] = useUpdateWarehouseMutation()
  const [values, setValues] = useState<Warehouses>(existing != null ? existing : {
    id: v4(),
    name: '',
    address: '',
    max_cap: 0,
    created_at: new Date().toUTCString(),
    updated_at: new Date().toUTCString()
  })
  const [isButtonDisabled, setButtonDisable] = useState<boolean>(true)
  const [errMsg, setErrMsg] = useState('')
  const handleChangeName = (val: string) => {
    setValues({ ...values, name: val })
  }
  const handleChangeAddress = (val: string) => {
    setValues({ ...values, address: val })
  }
  const handleChangeMaxCap = (val: string) => {
    setValues({ ...values, max_cap: Number(val) })
  }

  useEffect(() => {
    setButtonDisable(
      !(
        values.id &&
        values.name &&
        values.address &&
        values.max_cap
      )
    )
  }, [values])

  const submitWarehouse = (e: any) => {
    e.preventDefault()
    if (update) {
      updateWh({
        variables: {
          id: values.id,
          name: values.name,
          address: values.address,
          maxCap: values.max_cap
        }
      }).then((d) => refetchAction())
        .catch((e) => {
          setErrMsg(e.message)
        })
    } else {
      insertWh({
        variables: {
          name: values.name,
          address: values.address,
          maxCap: values.max_cap
        }
      }).then((d) => refetchAction())
        .catch((e) => setErrMsg(e.message))
    }
  }

  return (
    <React.Fragment>
      <SnackBar
        variant='error'
        message={errMsg}
        setMessage={(message) => setErrMsg(insertWhError != null ? insertWhError.message : message)}
      />
      <SnackBar
        variant='error'
        message={errMsg}
        setMessage={(message) => setErrMsg(updateWhError != null ? updateWhError.message : message)}
      />
      <form
        autoComplete={'off'}
        noValidate
        onSubmit={(e) => submitWarehouse(e)}
      >
        <GenericField
          inputType='text'
          placeholderValue={values.name!}
          isRequired={true}
          setField={handleChangeName}
          validationFunc={() => true}
          messages={{
            id: 'whName',
            label: 'Nama Gudang',
            autoComplete: 'false',
            name: 'WhName',
            invalidInput: 'Nama Invalid'
          }}
        />
        <GenericField
          inputType='text'
          placeholderValue={values.address!}
          isRequired={true}
          setField={handleChangeAddress}
          validationFunc={() => true}
          messages={{
            id: 'whAddress',
            label: 'Alamat Gudang',
            autoComplete: 'false',
            name: 'whAddress',
            invalidInput: 'Alamat Invalid'
          }}
        />
        <GenericField
          inputType='number'
          placeholderValue={values.max_cap.toString()}
          isRequired={true}
          setField={handleChangeMaxCap}
          validationFunc={(s) => Number(s) > 0}
          messages={{
            id: 'whMaxCap',
            label: 'Kapasitas Max',
            autoComplete: 'false',
            name: 'MaxCap',
            invalidInput: 'Kapasitas Invalid'
          }}
        />
        <Box display='flex' justifyContent='space-around' p={4}>
          {insertWhLoading || updateWhLoading ? (
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
    </React.Fragment>
  )

}

export default NewWarehouse