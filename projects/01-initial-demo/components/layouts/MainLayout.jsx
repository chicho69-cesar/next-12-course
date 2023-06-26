import Head from 'next/head';

import { Navbar } from '../Navbar';
import styles from './MainLayout.module.css';

/* Creamos el layout principal, el cual recibira el contenido de las paginas
y lo renderizara como un children de este mismo componente */
export const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Initial - NextJS</title>
        
        <meta name="description" content="Initial - NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
};
