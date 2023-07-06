import mongoose, { Model, Schema } from 'mongoose'
import { Entry } from '../interfaces'

/* Exportamos la interface IEntry para usarla como un tipo el cual tendrá los
mismos campos que la interface Entry. */
export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress','finished'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending'
  }
})

/* Creamos el EntryModel el cual sera exportado en el index como Entry solamente */
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel
