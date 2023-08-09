import Link from 'next/link'

import { DarkLayout } from '../components/layouts/DarkLayout'
import { MainLayout } from '../components/layouts/MainLayout'

export default function AboutPage () {
  return (
    <>
      <h1>About Page</h1>

      <h1 className='title'>
        Go to <Link href='/'>Home</Link>
      </h1>

      <p className='description'>
        Get started by editing{' '}
        <code className='code'>pages/about.jsx</code>
      </p>
    </>
  )
}

/* Mediante esto definimos la propiedad getLayout del componente
AboutPage, que es una función que recibe el componente de la pagina,
y lo podemos envolver en otros componentes para crear layouts, aunque
para que funcione debemos de ejecutar esta función en el archivo _app.js */
AboutPage.getLayout = function getLayout (page: JSX.Element) {
  return (
    <MainLayout>
      <DarkLayout>
        {page}
      </DarkLayout>
    </MainLayout>
  )
}
