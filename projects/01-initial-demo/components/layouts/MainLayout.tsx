import styles from './MainLayout.module.css'

import { FC } from 'react'
import Head from 'next/head'

import { Navbar } from '../Navbar'

type Props = {
  children?: JSX.Element
}

/* Creamos el layout principal, el cual recibirá el contenido de las paginas
y lo renderizara como un children de este mismo componente */
export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Initial - NextJS</title>
        
        <meta name='description' content='Initial - NextJS' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
