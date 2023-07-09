import '../styles/globals.css'

import { useEffect, useState } from 'react'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Cookies from 'js-cookie'

import { darkTheme, lightTheme, customTheme } from '../themes'

interface Props extends AppProps {
  theme: string
}

function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
  // console.log({ theme })

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  /* En lo siguiente usamos un efecto porque cuando tenemos la función de 
  getInitialProps, todas las paginas de la aplicación se renderizan del lado del servidor
  esto quiere decir que se ejecutan en el server, por lo que no si intentamos acceder al 
  valor de las cookies o del localstorage vamos a tener un error en el server, 
  ya que aquí no tenemos acceso a estos elementos, por lo que el useEffect nos 
  permite que accedamos a estos valores solamente en el cliente. */
  useEffect(() => {
    /* Obtenemos el valor de las cookies theme, y como puede ser undefined
    le ponemos el valor por defecto light. */
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
        ? darkTheme
        : customTheme

    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

/* La función getInitialProps hará que toda nuestra aplicación se ejecute del lado
del servidor y sea Server Side Rendering. 
getInitialProps es una funcion asincrona que puede ser agregada a la exportacion
por defecto del React componente en cada pagina. Esta regresara las props iniciales
para el componente tanto en el lado del servidor como el lado del cliente, durante 
la transicion de las paginas, lo que retorne esta funcion sera usada por la pagina 
como props iniciales. */
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // console.log('Hola desde el server')

//   /* Accedemos al contexto de la aplicación, y obtenemos el valor de las cookies, 
//   mediante la request del usuario */
//   const { theme } = appContext.ctx.req 
//     ? (appContext.ctx.req as any).cookies 
//     : { theme: 'light' }

//   const validThemes = ['light','dark','custom']

//   /* Regresamos las props que utilizaran cada una de las paginas */
//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark',
//   }
// }

export default MyApp
