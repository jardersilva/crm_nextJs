import { IUser } from '@/interfaces/IUsers'
import { parseCookies } from 'nookies'

export function getUserSession(): IUser | null {
  const cookies = parseCookies()

  try {
    const accessToken = cookies['@crmaplication.token']
    const userCookie = cookies['@crmaplication.user']

    if (accessToken && userCookie) {
      const parsedUser: IUser = JSON.parse(userCookie)

      return parsedUser
    }

    return null
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao verificar sessão')
  }
}
