import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { CssBaseline } from '@nextui-org/react'

/* El archivo especial de Next pages/_document.tsx es un archivo especial que nos permite
modificar el Documento HTML que se genera por defecto.
Lo cual nos permite modificar el html, el head y el body de la pagina.
Este componente es un Class Base Component */
class MyDocument extends Document {
  /* El método getInitialProps es un método de la clase Document que nos permite
  obtener los props que se envían a la pagina cuando se renderiza. */
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx)

    /* Originalmente lo que se regresa es return initialProps, pero como necesitamos
    hacer un flush de los estilos con NextUI, también vamos a regresar los styles */
    return { 
      ...initialProps,
      styles: <>{initialProps.styles}</>
    }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          {CssBaseline.flush()} {/* Hacemos un flush del css(normalize) */}
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
