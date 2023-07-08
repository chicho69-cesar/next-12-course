import type { NextApiRequest, NextApiResponse } from 'next'
// import mongoose from 'mongoose'

import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data = 
  | { message: string }
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  /* const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `The id: ${id} is not valid` })
  } */

  /* Verificamos el método que se haya utilizado para hacer request a la API */
  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)

    case 'GET':
      return getEntry(req, res)

    case 'DELETE':
      return deleteEntry(req, res)

    default:
      return res.status(400).json({ 
        message: `That method ${req.method} isn't a valid method` 
      })
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  await db.connect()
  const entryInDB = await Entry.findById(id)
  await db.disconnect()

  if (!entryInDB) {
    return res.status(400).json({ 
      message: `There isn't an entry with id: ${id}` 
    })
  }

  return res.status(200).json(entryInDB)
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  await db.connect()

  const entryToUpdate = await Entry.findById(id)
  if (!entryToUpdate) {
    await db.disconnect()
    return res.status(400).json({ 
      message: `There isn't an entry with id: ${id}` 
    })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, {
      description,
      status,
    }, {
      runValidators: true, 
      new: true
    })

    await db.disconnect()

    res.status(200).json(updatedEntry!)
  } catch (error: any) {
    await db.disconnect()
    res.status(400).json({ message: error.errors.status.message })
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  await db.connect()

  const entryToDelete = await Entry.findById(id)
  if (!entryToDelete) {
    await db.disconnect()
    return res.status(400).json({ 
      message: `There isn't an entry with id: ${id}` 
    })
  }

  try {
    const entry = await Entry.findByIdAndDelete(id)
    await db.disconnect()

    res.status(200).json(entry!)
  } catch (error: any) {
    await db.disconnect()
    res.status(400).json({ message: error.errors.status.message })
  }
}
