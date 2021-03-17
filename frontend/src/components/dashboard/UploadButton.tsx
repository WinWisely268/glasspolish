import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useS3Upload } from '../../service/media'
import { Config } from '../../providers/Config'
import SnackBar from '../shared/Snackbar'
import { Button } from '@material-ui/core'

export interface UploadMetadata {
  width: number
  height: number
}

export interface UploadButtonProps {
  accountId: string
  id: string
  tableName: string
  tableFieldName: string
  tablePrimaryField: string
  uploadMetadata: UploadMetadata | null
  onUploadDone: Function
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    display: 'none'
  },
  btnCenter: {
    display: 'inline-flex'
  }
}))

const UploadButton: React.FC<UploadButtonProps> = ({
                                                     accountId,
                                                     id,
                                                     tableName,
                                                     tableFieldName,
                                                     tablePrimaryField,
                                                     uploadMetadata,
                                                     onUploadDone
                                                   }) => {
  const classes = useStyles()
  const [errMsg, setErrMsg] = useState('')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { getRootProps, getInputProps } = useS3Upload({
    accountId: accountId,
    apiUrl: Config.awsUploadEndpoint + '/upload-url',
    pictureId: id,
    width: uploadMetadata?.width,
    height: uploadMetadata?.height,
    tableData: {
      tableField: tableFieldName,
      tableName: tableName,
      tablePrimaryField: tablePrimaryField
    },
    onError: (e: any) => setErrMsg(e),
    onUploadReady: () => onUploadDone(),
    isUploading: isUploading,
    setIsUploading: setIsUploading
  })

  return (
    <div {...getRootProps()} className={classes.root}>
      <SnackBar
        message={errMsg}
        variant='error'
        setMessage={(e: React.SetStateAction<string>) => setErrMsg(e)}
      />
      <input {...getInputProps()} />
      <label htmlFor='icon-button-file' className={classes.btnCenter}>
        <Button
          disabled={isUploading}
          color={'primary'}
          fullWidth
          aria-label='Upload'
          component='span'
        >
          {isUploading ? 'Uploading...' : 'Upload Gambar'}
        </Button>
      </label>
    </div>
  )
}

export default UploadButton
