
import { Schema } from 'mongoose'
import mongoose from "mongoose";
import { hash, compare } from "bcryptjs";
import { IClientes } from '../interfaces/IClientes';

const clientsSchema = new Schema({
  name: String,
  email: String,
  telefone: String,
  endereco: String,
  id_agente: { type: Schema.Types.ObjectId, ref: 'Agents' },
  status: String,
  valor: Number
},
{
  timestamps: true
})


export default mongoose.model<IClientes>('Clientes', clientsSchema)
