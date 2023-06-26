// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/* Creamos una ruta para el API usando Next API, mediante el cual podemos
crear una RESTFUL API de una forma muy parecida a Express */
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
