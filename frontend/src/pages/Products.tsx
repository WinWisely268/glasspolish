import { CircularProgress, Typography } from '@material-ui/core'
import { CellProps, TableInstance } from 'react-table'
import { Table } from '../components/table'
import React, { useCallback, useState } from 'react'
import DashboardLayout, { useStyles } from '../layouts/DashboardLayout'
import { ProductQueryResult } from '../types/products'
import { useListProductsQuery } from '../service/graphql'
import { NumberRangeColumnFilter } from '../utilities'
import SnackBar from '../components/shared/Snackbar'
import DialogForm from '../components/shared/DialogForm'
import { NewProduct } from '../components/products/NewProduct'

const columns = [
  {
    Header: 'Nama',
    columns: [
      {
        Header: 'Nama',
        accessor: 'name',
        aggregate: 'count',
        Aggregated: ({ cell: { value } }: CellProps<ProductQueryResult>) => `${value} Names`
      },
      {
        Header: 'SKU',
        accessor: 'sku',
        aggregate: 'uniqueCount',
        filter: 'fuzzyText',
        Aggregated: ({ cell: { value } }: CellProps<ProductQueryResult>) => `${value} Unique Names`
      }
    ]
  },
  {
    Header: 'Harga',
    columns: [
      {
        Header: 'HPP',
        accessor: 'buy_price',
        align: 'right',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        aggregate: 'avg',
        disableGroupBy: true,
        Aggregated: ({ cell: { value } }: CellProps<ProductQueryResult>) => `${value} (avg)`
      },
      {
        Header: 'MSRP',
        accessor: 'retail_price',
        align: 'right',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        aggregate: 'avg',
        Aggregated: ({ cell: { value } }: CellProps<ProductQueryResult>) => `${value} (total)`
      },
      {
        Header: 'Downline',
        accessor: 'downline_price',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        aggregate: 'avg',
        Aggregated: ({ cell: { value } }: CellProps<ProductQueryResult>) => `${value} (avg)`
      },
      {
        Header: 'Best',
        accessor: 'best_price',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        aggregate: 'avg',
        Aggregated: ({ cell: { value } }: CellProps<ProductQueryResult>) => `${value} (avg)`
      }
    ]
  }
] //.flatMap((c:any)=>c.columns) // remove comment to drop header groups

const ProductsPage: React.FC = () => {
  // const [data] = React.useState<PersonData[]>(() => makeData(100))
  const classes = useStyles()
  const [queryString, setQueryString] = useState<string>('%')
  const [createdAt, setCreatedAt] = useState<string>(new Date(0).toUTCString())
  const [limit, setLimit] = useState<number>(10)
  const [errMsg, setErrMsg] = useState('')
  const [selected, setSelected] = useState<ProductQueryResult | undefined>(undefined)
  const {
    data: listProductsData,
    loading,
    error,
    refetch
  } = useListProductsQuery({
    variables: {
      name: queryString,
      createdAt: createdAt,
      limit: limit
    }
  })
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setAddDialogOpen] = useState(false)

  const handleEditClick = useCallback((i: TableInstance<ProductQueryResult>) => () => {
    if (i !== undefined) {
      setSelected(i.selectedFlatRows[0].original)
    }
    setEditDialogOpen(!isEditDialogOpen)
  }, [isEditDialogOpen])

  const handleAddClick = useCallback(() => () => {
    setAddDialogOpen(!isAddDialogOpen)
  }, [isAddDialogOpen])

  const handleSearch = () => {
    if (queryString !== '' && queryString.length > 2) {
      setTimeout(() => {
        refetch().catch((e) => {
          setErrMsg(e.message)
        })
      }, 300)
    }
  }

  const handleChangeSearchQuery = (s: string) => {
    if (s.length > 2) {
      setQueryString('%' + s + '%')
    }
  }

  const dummy = useCallback(
    (instance: TableInstance<ProductQueryResult>) => () => {
      console.log(
        'Selected',
        instance.selectedFlatRows.map((v) => `'${v}'`)
      )
    },
    []
  )

  return (
    <DashboardLayout>
      <SnackBar
        variant='error'
        message={errMsg}
        setMessage={(msg: string) => setErrMsg(error != null ? error.message : msg)}
      />
      {loading ? <CircularProgress className={classes.notFound} /> :
        <Table<ProductQueryResult>
          name={'productsTable'}
          columns={columns}
          data={listProductsData!.products}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={dummy}
        />
      }
      <DialogForm title={'Edit'} content={<NewProduct existing={selected!} update={true} refetchAction={refetch} />}
                  open={isEditDialogOpen}
                  onClose={handleEditClick} />
      <DialogForm title={'Produk Baru'} content={<NewProduct refetchAction={refetch} />} open={isAddDialogOpen}
                  onClose={handleAddClick} />
    </DashboardLayout>
  )
}

export default ProductsPage
