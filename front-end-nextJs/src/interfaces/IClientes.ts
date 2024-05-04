export interface IClientes {
  _id?: string;
  name: String,
  email: String,
  telefone: String,
  endereco: String,
  id_agente: String | any,
  name_agente?: String,
  status: String,
  valor: number,
  createdAt?: String;
  updatedAt?: String;
}

export interface IClientesRequest {
  name: String,
  email: String,
  telefone: String,
  endereco: String,
  valor: number,
  id_agente?: String,
  status?: String,
}