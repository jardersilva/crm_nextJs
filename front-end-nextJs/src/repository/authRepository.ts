import api from "@/lib/api";

const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/v1/login', {
      email,
      password
    })

    if (response.status === 200) {
      return response.data
    }

    throw new Error('Falha ao realizar login')
  } catch (error: any) {
    console.error('err:: ', error)
    throw new Error(error.message)
  }
}

export { login }

