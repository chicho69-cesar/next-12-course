import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css'
import { darkTheme } from '../themes';

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}> {/* Creamos el provider de NextUI */}
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
