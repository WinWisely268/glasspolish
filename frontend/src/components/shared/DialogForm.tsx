import React from 'react'
import Button, { ButtonTypeMap } from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ExtendButtonBase } from '@material-ui/core'

export interface FormDialogProps {
  title: string,
  content: JSX.Element
  actions?: ExtendButtonBase<ButtonTypeMap>[]
}

const FormDialog: React.FC<FormDialogProps> = ({ title = 'New', content, actions }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        {actions !== null ? <DialogActions>
          {actions}
        </DialogActions> : <p />}
      </Dialog>
    </div>
  )
}

export default FormDialog