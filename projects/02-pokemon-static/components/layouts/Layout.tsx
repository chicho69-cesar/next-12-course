import { FC, ReactNode } from 'react'
import Head from 'next/head'

import { Navbar } from '../ui'

interface Props {
  children?: ReactNode | ReactNode[] // Recibimos uno o mas hijos
  title?: string
}

/* Usamos la condición de que el tipo de window sea undefined ya que si este es
undefined quiere decir que es porque el código se este ejecutando en el servidor,
esto debido a que en Next el código se ejecuta en el servidor y en el cliente,
en el servidor cuando se compila el contenido estático y en el cliente cuando
se hidrata con código de React para el cliente */
const origin = (typeof window !== 'undefined') ? window.location.origin : ''

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokémon App'}</title>

        {/* Basic Meta Tags */}
        <meta name='author' content='Cesar Villalobos Olmos'/>
        <meta name="description" content={`Información sobre el pokémon ${ title }`} />
        <meta name="keywords" content={ `${ title }, pokemon, pokedex`} />

        {/* Open Graph Meta Tags: Tags para redes sociales */}
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Esta es la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
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
