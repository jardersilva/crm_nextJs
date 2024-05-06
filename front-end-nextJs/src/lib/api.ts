import { useAuth } from '@/hooks'
import axios from 'axios'
import { parseCookies } from 'nookies'

const cookiesNookies = parseCookies()
const isServer = typeof window === 'undefined'

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers')
    const token = cookies().get('@crmaplication.token')?.value

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } else {
    const token = cookiesNookies['@crmaplication.token']
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

export default api
