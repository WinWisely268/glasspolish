import React, { useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import { useStyles } from '../../layouts/DashboardLayout'
import { useDeleteWarehouseMutation } from '../../service/graphql'
import SnackBar from '../shared/Snackbar'

export interface DeleteWarehouseProps {
  ids: string[] | undefined
  refetchAction: Function
}

export const DeleteWarehouse: React.FC<DeleteWarehouseProps> = () => {
  return (
    <React.Fragment>
      <Typography variant={'subtitle1'}>
        Yakin ingin menghapus gudang?
      </Typography>
    </React.Fragment>
  )
}

export const DeleteWarehouseActions: React.FC<DeleteWarehouseProps> = ({ ids, refetchAction }) => {
  const classes = useStyles()
  const [deleteWarehouse, {
    loading: deleteWarehouseLoading,
    error: deleteWarehouseError
  }] = useDeleteWarehouseMutation()
  const [error, setError] = useState<string>('')
  const deleteHandler = (e: any) => {
    e.preventDefault()
    if (ids === undefined) {
      setError('empty id')
    } else {
      ids.forEach((id) => {
        deleteWarehouse({
          variables: {
            id: id
          }
        }).catch((e) => {
          setError(e.message)
        })
      })
      refetchAction()
    }
  }
  return (
    <React.Fragment>
      <SnackBar variant={'error'} message={error}
                setMessage={(msg) => deleteWarehouseError?.message !== undefined ? setError(deleteWarehouseError.message) : msg} />

      <Box display='flex' justifyContent='space-around' p={4}>
        {deleteWarehouseLoading ? (
          <CircularProgress size={30} />
        ) : (
          <div>
            <Button
              className={classes.submitButton}
              onClick={deleteHandler}
              color='secondary'
              variant='contained'
            >
              OK
            </Button>
          </div>
        )}
      </Box>
    </React.Fragment>
  )
}

export default DeleteWarehouse