import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useContext } from 'react'

import { UIContext } from '../../context/ui'

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafts']

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer
      anchor='left'
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>
            Menú
          </Typography>
        </Box>

        <List>
          {
            menuItems.map( (text, index) => (
              <ListItem key={ text }>
                <ListItemButton>
                  <ListItemIcon>
                    { 
                      index % 2 ? (
                        <InboxOutlinedIcon />
                      ) : (
                        <MailOutlineOutlinedIcon />
                      )
                    }
                  </ListItemIcon>

                  <ListItemText primary={ text } />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

        <Divider />

        <List>
          {
            menuItems.map( (text, index) => (
              <ListItem key={ text }>
                <ListItemButton>
                  <ListItemIcon>
                    { 
                      index % 2 ? (
                        <InboxOutlinedIcon />
                      ) : (
                        <MailOutlineOutlinedIcon />
                      )  
                    }
                  </ListItemIcon>
                  
                  <ListItemText primary={ text } />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  )
}
