import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { db } from '../../../database'
import { Order } from '../../../models'
import { IOrder } from '../../../interfaces'

type Data = 
  | { message: string } 
  | IOrder[]

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  const session: any = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Debe de estar autenticado para hacer esto' })
  }

  if (session.user.role !== 'admin') {
    return res.status(401).json({ message: 'No tiene permiso para hacer esto' })
  }

  switch (req.method) {
    case 'GET':
      return getOrders(req, res)

    default:
      return res.status(400).json({ message: 'Bad request'})
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()

  const orders = await Order.find()
    .sort({ createdAt: 'desc' })
    .populate('user', 'name email')
    .lean()

  await db.disconnect()

  return res.status(200).json(orders)
}
