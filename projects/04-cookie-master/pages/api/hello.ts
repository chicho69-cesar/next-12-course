import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  /* Siempre que se hace un request de una función, pagina o recurso del backend de
  nuestra pagina, siempre en la petición se mandan las cookies, las cuales solamente 
  pueden almacenar una cantidad de 4 Kb, las cookies son muy útiles para almacenar
  cosas como las preferencias del usuario, las sesiones, cosas como por ejemplo
  si ha buscado muchos zapatos, podemos almacenar eso en las cookies para recomendarle
  productos mas parecidos al lo que el usuario ha buscado. */
  const cookies = req.cookies
  console.log({ cookies }) // Recibimos las cookies del cliente en el servidor

  res.status(200).json({ 
    name: 'John Doe',
    ...req.cookies
  })
}
