import {makeStyles} from '@material-ui/styles'
import React, {useState} from 'react'
import {useS3Upload} from '../../service/media'
import {Config} from '../../providers/Config'
import SnackBar from '../shared/Snackbar'
import {Button} from '@material-ui/core'

export interface UploadMetadata {
    width: number
    height: number
}

export interface UploadButtonProps {
    accountId: string
    id: string
    tableName: string
    tableFieldName: string
    uploadMetadata: UploadMetadata | null
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
                                                       uploadMetadata
                                                   }) => {
    const classes = useStyles()
    const [errMsg, setErrMsg] = useState('')
    const {getRootProps, getInputProps} = useS3Upload({
        accountId: accountId,
        apiUrl: Config.awsUploadEndpoint + '/upload-url',
        pictureId: id,
        width: uploadMetadata?.width,
        height: uploadMetadata?.height,
        tableData: {
            tableField: tableFieldName,
            tableName: tableName
        },
        onError: (e: any) => setErrMsg(e),
        onUploadReady: () => console.log('upload ready')
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
                    color='primary'
                    fullWidth
                    aria-label='Upload'
                    component='span'
                >
                    Upload Gambar
                </Button>
            </label>
        </div>
    )
}

export default UploadButton
