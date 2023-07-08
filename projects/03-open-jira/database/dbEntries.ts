import { isValidObjectId } from "mongoose"
import { db } from "./"
import { Entry, IEntry } from "../models"

export const getEntryByID = async (id: string): Promise<IEntry | null>  => {
  if (!isValidObjectId(id)) return null

  await db.connect()
  /* Cuando usamos la función encadenada lean, lo que hacemos es que obtenemos 
  el elemento de la base de datos, pero solamente con los datos que necesitamos,
  es decir, solo con la información que se almacena, sin funciones ni nada
  para manipularlo */
  const entry = await Entry.findById(id).lean()
  await db.disconnect()

  /* Aquí debemos de crear una copia del elemento que obtenemos de la base de datos
  porque si no lo serializamos obtendríamos un error en campos como el _id, ya que 
  este se guarda como un objeto de tipo ObjectId y no como una cadena de texto, lo 
  que nos podría ocasionar problemas con referencias y nos marcaría un error */
  return JSON.parse(JSON.stringify(entry))
}
