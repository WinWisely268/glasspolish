import { CircularProgress } from '@material-ui/core'
import { CellProps, Column, TableInstance } from 'react-table'
import { Table } from '../components/table'
import React, { useCallback, useState } from 'react'
import DashboardLayout, { useStyles } from '../layouts/DashboardLayout'
import { NumberRangeColumnFilter } from '../utilities'
import SnackBar from '../components/shared/Snackbar'
// import { Warehouse } from '../types'
import { useListWarehousesQuery, Warehouses } from '../service/graphql'
import DialogForm from '../components/shared/DialogForm'
import NewWarehouse from '../components/warehouses/NewWarehouse'
import DeleteWarehouse, { DeleteWarehouseActions } from '../components/warehouses/DeleteWarehouse'

const columns = [
  {
    Header: 'Nama',
    accessor: 'name',
    aggregate: 'uniqueCount',
    filter: 'fuzzyText',
    Aggregated: ({ cell: { value } }: CellProps<Warehouses>) => `${value} Nama unik`
  },
  {
    Header: 'Alamat',
    accessor: 'address',
    aggregate: 'uniqueCount',
    filter: 'fuzzyText',
    Aggregated: ({ cell: { value } }: CellProps<Warehouses>) => `${value} alamat unik`
  },
  {
    Header: 'Kapasitas Max',
    accessor: 'max_cap',
    align: 'right',
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    aggregate: 'avg',
    disableGroupBy: true,
    Aggregated: ({ cell: { value } }: CellProps<Warehouses>) => `${value} (avg)`
  }
]

const WarehousesPage: React.FC = () => {
  const classes = useStyles()
  const [queryString, setQueryString] = useState<string>('%')
  const [createdAt, setCreatedAt] = useState<string>(new Date(0).toUTCString())
  const [limit, setLimit] = useState<number>(10)
  const [errMsg, setErrMsg] = useState('')
  const [selected, setSelected] = useState<Warehouses | undefined>(undefined)
  const [toBeDeleted, setDeleted] = useState<string[] | undefined>([])
  const { data, loading, error, refetch } = useListWarehousesQuery({
    variables: {
      query: queryString
    }
  })
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleEditClick = useCallback((i: TableInstance<Warehouses>) => () => {
    if (i !== undefined) {
      setSelected(i.selectedFlatRows[0].original)
    }
    setEditDialogOpen(!isEditDialogOpen)
  }, [isEditDialogOpen])

  const handleAddClick = useCallback(() => () => {
    setAddDialogOpen(!isAddDialogOpen)
  }, [isAddDialogOpen])

  const handleDeleteClick = useCallback((i: TableInstance<Warehouses>) => () => {
    if (i !== undefined) {
      let rows: string[] = []
      i.selectedFlatRows.forEach((p) => {
        rows.push(p.original.id)
      })
      setDeleted(rows)
    }
    setDeleteDialogOpen(!isDeleteDialogOpen)
  }, [isDeleteDialogOpen])

  return (
    <DashboardLayout>
      <SnackBar variant={'error'} message={errMsg}
                setMessage={(msg: string) => setErrMsg(error != null ? error.message : msg)} />
      {loading ? <CircularProgress className={classes.notFound} /> :
        <Table<any>
          name={'warehouseTable'}
          columns={columns}
          data={data!.warehouses}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      }
      <DialogForm title={'Edit'} content={<NewWarehouse existing={selected!} update={true} refetchAction={refetch} />}
                  open={isEditDialogOpen}
                  onClose={handleEditClick} />
      <DialogForm title={'Gudang Baru'} content={<NewWarehouse refetchAction={refetch} />} open={isAddDialogOpen}
                  onClose={handleAddClick} />
      <DialogForm title={'Hapus'} content=
        {<DeleteWarehouse ids={toBeDeleted} refetchAction={refetch} />}
                  open={isDeleteDialogOpen} onClose={handleDeleteClick}
                  actions=
                    {<DeleteWarehouseActions ids={toBeDeleted} refetchAction={refetch} />} />
    </DashboardLayout>
  )

}

export default WarehousesPage