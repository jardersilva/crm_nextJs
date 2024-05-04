export interface IClientes extends Document{
  id?: string;
  name: String,
  email: String,
  telefone: String,
  endereco: String,
  id_agente: any,
  name_agente?: String,
  status: String,
  valor: number,
  createdAt?: Date;
  updatedAt?: Date;
}