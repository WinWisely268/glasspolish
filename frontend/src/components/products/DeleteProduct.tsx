import React, { useState } from 'react'
import { useDeleteProductMutation } from '../../service/graphql'
import { useStyles } from '../../layouts/DashboardLayout'
import SnackBar from '../shared/Snackbar'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'

export interface DeleteProductProps {
  ids: string[] | undefined
  refetchAction: Function
}

export const DeleteProduct: React.FC<DeleteProductProps> = () => {
  return (
    <React.Fragment>
      <Typography variant={'subtitle1'}>
        Yakin ingin menghapus produk?
      </Typography>
    </React.Fragment>
  )
}

export const DeleteProductActions: React.FC<DeleteProductProps> = ({ ids, refetchAction }) => {
  const classes = useStyles()
  const [deleteProduct, { loading: deleteProductLoading, error: deleteProductError }] = useDeleteProductMutation()
  const [error, setError] = useState<string>('')
  const deleteHandler = (e: any) => {
    e.preventDefault()
    if (ids === undefined) {
      setError('empty id')
    } else {
      ids.forEach((id) => {
        deleteProduct({
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
                setMessage={(msg) => deleteProductError?.message !== undefined ? setError(deleteProductError.message) : msg} />

      <Box display='flex' justifyContent='space-around' p={4}>
        {deleteProductLoading ? (
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

export default DeleteProduct