import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

/* Creamos un nuevo tema de material ui con el tema oscuro */
export const darkTheme = createTheme({
  /* Modificamos la paleta de colores del tema oscuro */
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  },
  /* Modificamos los estilos de los componentes de material ui */
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c'
        }
      }
    }
  }
})
