import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Grid, Select, MenuItem } from '@mui/material'
import { PeopleOutline } from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { AdminLayout } from '../../components/layouts'
import { IUser } from '../../interfaces'
import { tesloApi } from '../../api'

const UsersPage: NextPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users')
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  const { data: session }: any = useSession()
  const router = useRouter()

  if (session != undefined) {
    if (!session.user.role || session.user.role !== 'admin') {
      router.push(`/`)
      return (<></>)
    }
  }

  if (!data && !error) return (<></>)

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }))
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role
    }))

    setUsers(updatedUsers)

    try {
      await tesloApi.put('/admin/users', { userId, role: newRole })
    } catch (error) {
      setUsers(previosUsers)
      console.log(error)
      alert('No se pudo actualizar el role del usuario')
    }
  }

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    {
      field: 'role', 
      headerName: 'Rol', 
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label='Rol'
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: '300px' }}
          >
            <MenuItem value='admin'> Admin </MenuItem>
            <MenuItem value='client'> Client </MenuItem>
            <MenuItem value='super-user'> Super User </MenuItem>
            <MenuItem value='SEO'> SEO </MenuItem>
          </Select>
        )
      }
    },
  ]

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }))

  return (
    <AdminLayout 
      title={'Usuarios'} 
      subTitle={'Mantenimiento de usuarios'}
      icon={ <PeopleOutline /> }
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

export default UsersPage
