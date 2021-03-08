import React, {useEffect, useReducer, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import httpClient from '../../providers/HttpClient'
import ky from 'ky'
import {v4 as uuidv4} from 'uuid'
import {
    uploadURLForm,
    downloadURLForm,
    presignedURLForm,
    mediaAPIResponse,
    DEFAULT_IMG_WIDTH,
    DEFAULT_IMG_HEIGHT
} from '../../models/aws'

type reducerState = {
    isLoading: boolean
    isError: boolean
    requestOption: uploadURLForm | downloadURLForm | presignedURLForm
    data: mediaAPIResponse
    requestUrl: string
}

type actionDispatcher = {
    type: string
    payload?: any
    url?: string
}

const initialState: reducerState = {
    isLoading: false,
    isError: false,
    data: {url: ''},
    requestUrl: '',
    requestOption: {
        file: '',
        prefix: ''
    }
}

const dataReducer: React.Reducer<reducerState, actionDispatcher> = (
    state,
    action
) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {...state, isLoading: true, isError: false}
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'FETCH_FAILURE':
            return {...state, isLoading: false, isError: true, data: action.payload}
        default:
            return state
    }
}

export interface mediaApiInput {
    initialUrl: string
    initialData: any
    requestOption: uploadURLForm | downloadURLForm | presignedURLForm
}

export const useMediaApi = ({
                                initialUrl,
                                initialData,
                                requestOption
                            }: mediaApiInput) => {
    const [state, dispatch] = useReducer(dataReducer, {
        ...initialState,
        data: initialData,
        requestOption: requestOption,
        requestUrl: initialUrl
    })

    useEffect(() => {
        let didCancel = false
        ;(async function fetchData() {
            dispatch({type: 'FETCH_INIT'})
            try {
                const resp = await httpClient
                    .post(state.requestUrl !== undefined ? state.requestUrl : '', {
                        json: state.requestOption
                    })
                    .json()
                console.log(resp)
                if (!didCancel) {
                    return dispatch({type: 'FETCH_SUCCESS', payload: resp})
                }
            } catch (e) {
                if (!didCancel) {
                    return dispatch({type: 'FETCH_FAILURE', payload: e})
                }
            }
        })()
        return () => {
            didCancel = true
        }
    }, [state.requestOption, state.requestUrl])

    return state
}

export interface s3UploadForm {
    accountId: string
    pictureId: string | undefined
    apiUrl: string
    width?: number
    height?: number
    onUploadReady: Function
    onError: Function
    tableData: prefixData
}

export interface presignedForm {
    prefix: string
    fileName: string
    contentType: string
    apiUrl: string
    width?: number
    height?: number
}

interface prefixData {
    tableName: string
    tableField: string
}

export const useS3Upload = ({
                                accountId,
                                pictureId = undefined,
                                apiUrl,
                                width = DEFAULT_IMG_WIDTH,
                                height = DEFAULT_IMG_HEIGHT,
                                onUploadReady,
                                tableData,
                                onError
                            }: s3UploadForm) => {
    let presignedUrl: string | undefined

    const [isUploading, setIsUploading] = useState<boolean>(false)

    async function onUploadStart(
        pform: presignedForm
    ): Promise<mediaAPIResponse> {
        return await httpClient
            .post(pform.apiUrl, {
                json: {
                    prefix: pform.prefix,
                    file: pform.fileName,
                    width: pform.width,
                    height: pform.height,
                    contentType: pform.contentType
                }
            })
            .json<mediaAPIResponse>()
            .then((data) => {
                return data
            })
            .catch((e) => {
                console.log(e)
                throw e
            })
    }

    const constructPrefix = (): string => {
        const dt = new Date()
        const UTCseconds = Math.round(
            (dt.getTime() + dt.getTimezoneOffset() * 60 * 1000) / 1000
        )
        const tblRecordId =
            typeof pictureId === undefined ? uuidv4().toString() : pictureId
        const prefixArr: string[] = [
            accountId,
            tableData.tableName,
            tblRecordId as string,
            tableData.tableField,
            UTCseconds.toString()
        ]
        return prefixArr.join('/')
    }

    async function handleDrop(files: File[]) {
        // let the caller know that a file has been selected and a fetch begin
        setIsUploading(true)
        const fileName = files[0].name
        const fileType = files[0].type
        const prefix = constructPrefix()
        const presignedResp = await onUploadStart({
            apiUrl: apiUrl,
            contentType: fileType,
            fileName: fileName,
            width: width,
            height: height,
            prefix: prefix
        })
        presignedUrl = presignedResp.url
        return await ky
            .put(presignedUrl, {
                body: files[0],
                headers: {
                    'x-amz-meta-width': presignedResp.headers!['x-amz-meta-width'],
                    'x-amz-meta-height': presignedResp.headers!['x-amz-meta-height'],
                    'content-type': fileType
                }
            })
            .then((resp) => {
                if (resp.status !== 200) {
                    onError('error uploading')
                    return
                }
                setIsUploading(false)
                onUploadReady()
            })
            .catch((e) => {
                onError(e.message)
                throw e
            })
    }

    return useDropzone({
        accept: 'image/*',
        disabled: isUploading,
        maxFiles: 1,
        onDrop: handleDrop
    })
}
