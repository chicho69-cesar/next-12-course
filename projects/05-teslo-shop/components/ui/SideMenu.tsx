import { FC, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Box, Divider, Drawer, IconButton,
  Input, InputAdornment, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, ListSubheader,
} from '@mui/material'
import {
  AccountCircleOutlined, AdminPanelSettings,
  CategoryOutlined, ConfirmationNumberOutlined,
  DashboardOutlined, EscalatorWarningOutlined,
  FemaleOutlined, LoginOutlined,
  MaleOutlined, SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material'

import { UiContext, AuthContext } from '../../context'

export const SideMenu: FC = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
  const { user, isLoggedIn, logout } = useContext(AuthContext)

  const [searchTerm, setSearchTerm] = useState('')

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    toggleSideMenu()
    navigateTo(`/search/${searchTerm}`)
  }

  const navigateTo = (url: string) => {
    toggleSideMenu()
    router.push(url)
  }
  
  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
              onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleOutlined />
                  </ListItemIcon>

                  <ListItemText primary={'Perfil'} />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigateTo('/orders/history')}>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>

                  <ListItemText primary={'Mis Ordenes'} />
                </ListItemButton>
              </ListItem>
            </>
          )}

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemButton onClick={() => navigateTo('/category/men')}>
              <ListItemIcon>
                <MaleOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Hombres'} />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemButton onClick={() => navigateTo('/category/women')}>
              <ListItemIcon>
                <FemaleOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Mujeres'} />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemButton onClick={() => navigateTo('/category/kid')}>
              <ListItemIcon>
                <EscalatorWarningOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Niños'} />
            </ListItemButton>
          </ListItem>

          {isLoggedIn ? (
            <ListItem>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>

                <ListItemText primary={'Salir'} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem>
              <ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>

                <ListItemText primary={'Ingresar'} />
              </ListItemButton>
            </ListItem>
          )}

          {/* Admin */}
          {user?.role === 'admin' && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem>
                <ListItemButton onClick={() => navigateTo('/admin/')}>
                  <ListItemIcon>
                    <DashboardOutlined />
                  </ListItemIcon>

                  <ListItemText primary={'Dashboard'} />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigateTo('/admin/products')}>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  
                  <ListItemText primary={'Productos'} />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigateTo('/admin/orders')}>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  
                  <ListItemText primary={'Ordenes'} />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigateTo('/admin/users')}>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  
                  <ListItemText primary={'Usuarios'} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  )
}
