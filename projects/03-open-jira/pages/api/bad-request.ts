import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean
  message: string | string[]
}

/* Vamos a utilizar este endpoint para mostrar el error que queramos, al hacer 
validaciones desde nuestro middleware */
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { message = 'Bad Request' } = req.query

  res.status(400).json({ 
    ok: false,
    message 
  })
}
