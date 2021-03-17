import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import { useStyles } from '../table/TableToolbar'

export interface FormDialogProps {
  title: string,
  content: JSX.Element
  actions?: JSX.Element
  open: boolean,
  onClose: Function
}

const FormDialog: React.FC<FormDialogProps> = ({ title = 'New', content, actions, open, onClose }) => {

  return (
    <Dialog maxWidth={'xl'} open={open} onClose={onClose()} aria-labelledby={title}>
      <DialogTitle id={title}>{title}</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      {actions !== null ? <DialogActions>
        {actions}
      </DialogActions> : <p />}
    </Dialog>
    // </div>
  )
}

export interface ActionButtonProps {
  title: string
  content: JSX.Element
  icon: JSX.Element
}

export const ActionButton: React.FC<ActionButtonProps> = ({ ...props }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <IconButton
        className={classes.rightIcons}
        onClick={handleClickOpen}
        disabled={false}
      >
        {props.icon}
      </IconButton>
      <Dialog maxWidth={'xl'} open={open} onClose={handleClose} aria-labelledby={props.title}>
        <DialogTitle id={props.title}>{props.title}</DialogTitle>
        <DialogContent>
          {props.content}
        </DialogContent>
      </Dialog>
    </div>
  )

}

export default FormDialog