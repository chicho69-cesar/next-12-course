import { FC } from 'react'
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from '@mui/icons-material'

export const SideMenu: FC = () => {
  return (
    <Drawer
      open={false}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Perfil'} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumberOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Mis Ordenes'} />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemButton>
              <ListItemIcon>
                <MaleOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Hombres'} />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemButton>
              <ListItemIcon>
                <FemaleOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Mujeres'} />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemButton>
              <ListItemIcon>
                <EscalatorWarningOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Niños'} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <VpnKeyOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Ingresar'} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LoginOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Salir'} />
            </ListItemButton>
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CategoryOutlined/>
              </ListItemIcon>

              <ListItemText primary={'Productos'} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumberOutlined/>
              </ListItemIcon>
              
              <ListItemText primary={'Ordenes'} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AdminPanelSettings/>
              </ListItemIcon>

              <ListItemText primary={'Usuarios'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
