import { IAgentsRequest } from "@/interfaces/IUsers";
import api from "@/lib/api";

const create = async (agent: IAgentsRequest) => {
  try {
    const response = await api.post('/v1/agents', agent)

    if (response.status === 201) {
      return response.data
    }

    if (response.status === 400) {
      throw new Error(response.data.message)
    }

    throw new Error('Erro ao criar agente')
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.error || 'Erro na solicitação. Verifique os dados.'); 
    } else {
      throw new Error('Erro na solicitação: Sem resposta do servidor.');
    }
  }
}

const update = async (agent: IAgentsRequest, id: string) => {
  try {
    const response = await api.put(`/v1/agents/${id}`, agent)

    if (response.status === 202) {
      return response.data
    }

    throw new Error('Erro ao criar agente')
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
    const response = await api.delete(`/v1/agents/${id}`)

    if (response.status === 204) {
      return response.data
    }

    throw new Error('Erro ao deletar agente')
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
    const response = await api.get(`/v1/agents?perPage=${perPage}&pageNumber=${page}`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error('Erro ao listar agentes')
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const show = async (id: string) => {
  try {
    const response = await api.get(`/v1/agents/${id}`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error('Erro ao buscar agente')
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { create, update, remove, list, show }

