'use client'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { IUser } from '@/interfaces/IUsers'
import { destroyCookie, setCookie } from 'nookies'
import { getUserSession } from '@/utils/getUserSession'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface SignInCredentials {
  email: string
  password: string
}
export interface AuthContextData {
  user: IUser | null
  isAuthenticated: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signout(): void
}
interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const checkSessionUser = useCallback(async (): Promise<void> => {
    try {
      const userSession = getUserSession()
      setUser(userSession)
      setIsAuthenticated(true)
    } catch (error: any) {
      console.error('🚀 ~ AuthProvider ~ error', error)
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    checkSessionUser().catch((error) => console.error(error))
  }, [checkSessionUser])

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      const res = await api.post('/v1/login', {
        email,
        password,
      })

      setCookie(undefined, '@crmaplication.token', res.data.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 Dias
        path: '/',
      })

      setCookie(undefined, '@crmaplication.user', JSON.stringify(res.data.user), {
        maxAge: 60 * 60 * 24 * 30, // 30 Dias
        path: '/',
      })

      setUser(res.data.user)
      setIsAuthenticated(true)

      api.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`
      window.history.pushState({}, '', '/admin');
      window.location.reload();
    },
    [router],
  )

  const signout = useCallback(() => {
    destroyCookie(undefined, '@crmaplication.token')
    destroyCookie(undefined, '@crmaplication.user')

    router.replace('/auth/signin')
  }, [router])

  const values = { user, isAuthenticated, signIn, signout }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer, AuthContext }
