import { createTheme } from '@mui/material'
import { green, grey, purple, red } from '@mui/material/colors'

export const customTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: grey[300]
    },
    primary: {
      main: red[900]
    },
    secondary: {
      main: green[500]
    },
    error: {
      main: red.A400
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {}
    }
  }
})
