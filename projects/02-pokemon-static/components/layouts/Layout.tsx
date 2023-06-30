import { FC, ReactNode } from 'react'
import Head from 'next/head'

import { Navbar } from '../ui'

interface Props {
  children?: ReactNode | ReactNode[] // Recibimos uno o mas hijos
  title?: string
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokémon App'}</title>
        <meta name='author' content='Cesar Villalobos Olmos'/>
        <meta name="description" content={`Información sobre el pokémon ${ title }`} />
        <meta name="keywords" content={ `${ title }, pokemon, pokedex`} />
      </Head>

      <Navbar />

      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  )
}
