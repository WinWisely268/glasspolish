import React, { ChangeEvent, useEffect, useState } from 'react'
import { ProductQueryResult } from '../../types/products'
import { v4 } from 'uuid'
import { useStyles } from '../../layouts/DashboardLayout'
import { useInsertProductMutation, useListProductTagsQuery } from '../../service/graphql'
import SnackBar from '../shared/Snackbar'
import { GenericField } from '../shared/GenericFormField'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid } from '@material-ui/core'
import { AutoCompleteField } from '../shared/AutoCompleteField'

interface NewProductProps {
  existing?: ProductQueryResult
  update?: boolean
  refetchAction: Function
}

export const NewProduct: React.FC<NewProductProps> = ({
                                                        existing,
                                                        update = false,
                                                        refetchAction
                                                      }) => {
  const classes = useStyles()
  const [insertProduct, { loading: insertProductLoading, error: insertProductErr }] = useInsertProductMutation()
  const [queryString, setQueryString] = useState<string>('%')
  const {
    data: listTagsData,
    loading: listTagsLoading,
    error: listTagsError,
    refetch: listTagsRefetch
  } = useListProductTagsQuery({
    variables: {
      query: queryString
    }
  })
  const [values, setValues] = useState<ProductQueryResult>(existing != null ? existing : {
    id: v4(),
    name: '',
    sku: '',
    buy_price: 0,
    best_price: 0,
    downline_price: 0,
    retail_price: 0,
    sellable: false,
    created_at: new Date().toUTCString(),
    updated_at: new Date().toUTCString(),
    product_pictures: [
      {
        id: v4(),
        picture_url: '',
        primary: false
      }
    ],
    product_tag: {
      id: '',
      name: ''
    }
  })
  const [isButtonDisabled, setButtonDisable] = useState<boolean>(true)
  const [errMsg, setErrMsg] = useState('')
  const handleChangeName = (val: string) => {
    setValues({ ...values, name: val })
  }

  const handleChangeSku = (val: string) => {
    setValues({ ...values, sku: val })
  }

  const handleChangeBuyPrice = (val: string) => {
    setValues({ ...values, buy_price: Number(val) })
  }

  const handleChangeBestPrice = (val: string) => {
    setValues({ ...values, best_price: Number(val) })
  }

  const handleChangeDownlinePrice = (val: string) => {
    setValues({ ...values, downline_price: Number(val) })
  }

  const handleChangeRetailPrice = (val: string) => {
    setValues({ ...values, retail_price: Number(val) })
  }

  const handleChangeSellable = (evt: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setValues({ ...values, sellable: checked })
  }

  const handleChangeTagId = (val: string) => {
    console.log(`TagID: ${val}`)
    setValues({ ...values, product_tag: { id: val, name: '' } })
  }

  useEffect(() => {
    setButtonDisable(
      !(
        values.id &&
        values.name &&
        values.sku &&
        values.buy_price &&
        values.product_tag!.id
      )
    )
  }, [values])

  const submitNewProduct = (e: any) => {
    e.preventDefault()
    if (!update) {
      insertProduct({
        variables: {
          sku: values.sku,
          name: values.name!,
          sellable: values.sellable,
          buyPrice: values.buy_price,
          bestPrice: values.best_price,
          downlinePrice: values.downline_price,
          retailPrice: values.retail_price,
          tagId: values.product_tag!.id
        }
      }).then((data) => {
        refetchAction()
      }).catch((e) => {
        setErrMsg(e.message)
      })
    } else {

    }

  }

  return (
    <React.Fragment>
      <SnackBar
        variant='error'
        message={errMsg}
        setMessage={(message) => setErrMsg(insertProductErr != null ? insertProductErr.message : message)}
      />
      <form
        autoComplete={'off'}
        noValidate
        onSubmit={(e) => submitNewProduct(e)}
      >
        <GenericField
          inputType='text'
          placeholderValue={values.name!}
          isRequired={true}
          setField={handleChangeName}
          validationFunc={() => true}
          messages={{
            id: 'productName',
            label: 'Nama Produk',
            autoComplete: 'false',
            name: 'ProductName',
            invalidInput: 'Nama Invalid'
          }}
        />
        <GenericField
          inputType='text'
          placeholderValue={values.sku}
          isRequired={true}
          setField={handleChangeSku}
          validationFunc={(s) => s.length > 2}
          messages={{
            id: 'productSku',
            label: 'SKU Produk',
            autoComplete: 'false',
            name: 'ProductSku',
            invalidInput: 'Sku Invalid'
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.sellable}
              onChange={handleChangeSellable}
              name='sellable'
              color='primary'
            />
          }
          label='Dapat Dijual'
        />
        <GenericField
          inputType='number'
          placeholderValue={values.buy_price.toString()}
          isRequired={true}
          setField={handleChangeBuyPrice}
          validationFunc={(s) => Number(s) > 0}
          messages={{
            id: 'productBuyPrice',
            label: 'HPP Produk',
            autoComplete: 'false',
            name: 'ProductHpp',
            invalidInput: 'Hpp Invalid'
          }}
        />
        <GenericField
          inputType='number'
          placeholderValue={values.best_price.toString()}
          isRequired={false}
          setField={handleChangeBestPrice}
          validationFunc={(s) => Number(s) > 0}
          messages={{
            id: 'productBestPrice',
            label: 'Harga Best',
            autoComplete: 'false',
            name: 'HargaBest',
            invalidInput: 'Harga Invalid'
          }}
        />
        <GenericField
          inputType='number'
          placeholderValue={values.downline_price.toString()}
          isRequired={false}
          setField={handleChangeDownlinePrice}
          validationFunc={(s) => Number(s) > 0}
          messages={{
            id: 'productDownlinPrice',
            label: 'Harga Downline',
            autoComplete: 'false',
            name: 'HargaDownline',
            invalidInput: 'Harga Invalid'
          }}
        />
        <GenericField
          inputType='number'
          placeholderValue={values.retail_price.toString()}
          isRequired={false}
          setField={handleChangeRetailPrice}
          validationFunc={(s) => Number(s) > 0}
          messages={{
            id: 'productRetailPrice',
            label: 'Harga Retail / MSRP',
            autoComplete: 'false',
            name: 'HargaRetail',
            invalidInput: 'Harga Invalid'
          }}
        />
        <AutoCompleteField values={listTagsData?.product_tags} setSelected={handleChangeTagId}
                           label={'Pilih Tag'} />
        <Box display='flex' justifyContent='space-around' p={4}>
          {insertProductLoading ? (
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

