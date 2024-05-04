import { IClientesRequest } from "@/interfaces/IClientes";
import api from "@/lib/api";

const create = async (client: IClientesRequest) => {
  try {
    const response = await api.post('/v1/clients', client)

    if (response.status === 201) {
      return response.data
    }

    if (response.status === 400) {
      throw new Error(response.data.message)
    }

    throw new Error('Erro ao criar cliente')
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.error || 'Erro na solicitação. Verifique os dados.'); 
    } else {
      throw new Error('Erro na solicitação: Sem resposta do servidor.');
    }
  }
}

const update = async (client: IClientesRequest, id: string) => {
  try {
    const response = await api.put(`/v1/clients/${id}`, client)

    if (response.status === 202) {
      return response.data
    }

    throw new Error('Erro ao criar cliente')
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.error || 'Erro na solicitação. Verifique os dados.'); 
    } else {
      throw new Error('Erro na solicitação: Sem resposta do servidor.');
    }
  }
}

const remove = async (id: string) => {
  try {
    const response = await api.delete(`/v1/clients/${id}`)

    if (response.status === 204) {
      return response.data
    }

    throw new Error('Erro ao deletar cliente')
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.error || 'Erro na solicitação. Verifique os dados.'); 
    } else {
      throw new Error('Erro na solicitação: Sem resposta do servidor.');
    }
  }
}

const list = async (perPage: number, page: number) => {
  try {
    const response = await api.get(`/v1/clients?perPage=${perPage}&pageNumber=${page}`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error('Erro ao listar clientes')
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const relatorio = async (status: String, agentes_id: String, data1: String, data2: String) => {
  try {
    const response = await api.get(`/v1/clients?status=${status}&agente_id=${agentes_id}&data1=${data1}&data2=${data2}`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error('Erro ao listar clientes')
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const show = async (id: string) => {
  try {
    const response = await api.get(`/v1/clients/${id}`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error('Erro ao buscar cliente')
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { create, update, remove, list, show, relatorio }

