import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box, SxProps, Theme } from '@mui/material'

import { Navbar, Sidebar } from '../ui'

interface Props {
  title?: string
  children?: ReactNode | ReactNode[]
}

const styles: { [key: string]: SxProps<Theme> } = {
  main: {
    padding: '10px 20px'
  }
}

export const Layout: FC<Props> = ({ title = 'OpenJira - App', children }) => {
  return (
    /* La propiedad sx de los componentes de Material UI es la opción para 
    definir estilos css adicionales al estilos por defecto, es como la propiedad
    style de los componentes de react o la propiedad css en NextUI */
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Sidebar />

      {/* Otra forma de definir estilos css para mui */}
      <Box /* sx={styles.main} */ sx={{ padding: '10px 20px' }}>
        {children}
      </Box>
    </Box>
  )
}
