import Link from 'next/link'
import { MainLayout } from '../components/layouts/MainLayout'

/* Todos los componentes de la carpeta pages deben de tener una 
exportación por defecto y no necesariamente deben llamarse igual que el archivo */
export default function HomePage () {
  return (
    <>
      {/* El Head rendering los elementos que se encuentran en el head */}
      {/* <Head>
        <title>Home - Next</title>
        
        <meta name='description' content='Home Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}

      {/* El contenido de los Head se va juntando y no se sobre escribe */}
      {/* <Head>
        <meta name='keywords' content='Next, Javascript, React' />
      </Head> */}
      
      {/* Usamos nuestro layout principal para envolver el contenido
      de la pagina index */}
      <MainLayout>
        <>
          <h1>Home Page</h1>

          <h1 className='title'>
            {/* Ir a <a href='/about'>About</a> */}
            Go to <Link href='/about'>About</Link>
          </h1>

          <p className='description'>
            Get started by editing{' '}
            <code className='code'>pages/index.js</code>
          </p>
        </>
      </MainLayout>
    </>
  )
}
