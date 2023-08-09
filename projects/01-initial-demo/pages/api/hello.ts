// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

/* Creamos una ruta para el API usando Next API, mediante el cual podemos
crear una RESTFUL API de una forma muy parecida a Express */
export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ 
    name: 'John Doe' 
  })
}
