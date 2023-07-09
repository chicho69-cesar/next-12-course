import { FC } from 'react'
import NextLink from 'next/link'

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'

export const Navbar: FC = () => {
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
        >
          <MenuOutlined />
        </IconButton>

        <NextLink href='/' passHref>
          <Link>
            <Typography variant='h6' color="white">
              CookieMaster
            </Typography>
          </Link>
        </NextLink>

        <div style={{ flex: 1 }}/>

        <NextLink href='/theme-changer' passHref>
          <Link>
            <Typography variant='h6' color="white">
              Cambiar Tema
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
