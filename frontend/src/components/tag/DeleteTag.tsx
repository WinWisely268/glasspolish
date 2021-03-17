import React, { useState } from 'react'
import { useStyles } from '../../layouts/DashboardLayout'
import { useDeleteProductTagMutation } from '../../service/graphql'
import SnackBar from '../shared/Snackbar'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'

export interface DeleteTagProps {
  id: string,
  refetch: Function
}

export const DeleteTagAction: React.FC<DeleteTagProps> = ({ id, refetch }) => {
  const classes = useStyles()
  const [deleteTag, { loading, error }] = useDeleteProductTagMutation()
  const [err, setErr] = useState<string>('')
  const deleteHandler = (e: any) => {
    e.preventDefault()
    deleteTag({
      variables: {
        tagId: id
      }
    }).catch((e) => {
      setErr(e.message)
    })
    refetch()
  }
  return (
    <React.Fragment>
      <SnackBar variant={'error'} message={err}
                setMessage={(msg) => error?.message !== undefined ? setErr(error.message) : msg} />
      <Typography variant={'subtitle1'}>
        Yakin ingin menghapus kategori / tag?
      </Typography>
      <Box display='flex' justifyContent='space-around' p={4}>
        {loading ? (
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

export default DeleteTagAction