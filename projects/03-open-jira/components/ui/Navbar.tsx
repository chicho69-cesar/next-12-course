import { FC, useContext } from 'react'
import NextLink from 'next/link'
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { UIContext } from '../../context/ui'

export const Navbar: FC = () => {
  /* Extraemos la función openSideMenu del contexto para modificar el estado de
  la sidebar, en este caso abrir el menu */
  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton 
          size='large'
          edge='start'
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>

        <NextLink href='/' passHref>
          <Link underline='none' color='white'>
            <Typography variant='h6'>
              OpenJira
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
