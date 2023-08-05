import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Chip, Grid } from '@mui/material'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import useSWR from 'swr'

import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Orden ID', width: 250 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'name', headerName: 'Nombre Completo', width: 300 },
  { field: 'total', headerName: 'Monto total', width: 300 },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid
        ? (<Chip variant='outlined' label='Pagada' color='success' />)
        : (<Chip variant='outlined' label='Pendiente' color='error' />)
    }
  },
  { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150 },
  {
    field: 'check',
    headerName: 'Ver orden',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer' >
          Ver orden
        </a>
      )
    }
  },
  { field: 'createdAt', headerName: 'Creada en', width: 300 },
]

const OrdersPage: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders')
  const { data: session }: any = useSession()
  const router = useRouter()

  if (session != undefined) {
    if (!session.user.role || session.user.role !== 'admin') {
      router.push(`/`)
      return (<></>)
    }
  }

  if (!data && !error) return (<></>)

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }))

  return (
    <AdminLayout 
      title={'Ordenes'} 
      subTitle={'Mantenimiento de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height:650, width: '100%' }}>
          <DataGrid 
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default OrdersPage
