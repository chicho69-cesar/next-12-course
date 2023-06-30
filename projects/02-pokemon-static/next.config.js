
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  /* Usamos el objeto images para que Next.js sepa que dominios de 
  imágenes nos van a permitir cargarlas. Ya que siempre Next trata de 
  renderizar las images de nuestro dominio local, en la carpeta public, y
  si no la encuentra ahi va a verificar que este en este arreglo. */
  images: {
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
