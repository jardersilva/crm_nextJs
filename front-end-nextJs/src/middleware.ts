import { NextRequest } from 'next/server'
import { IUser } from './interfaces/IUsers'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@crmaplication.token')?.value
  const userSession = request.cookies.get('@crmaplication.user')?.value
  const pathname = request.nextUrl.pathname
  console.log("Token::: ", token)

  if (token && !pathname.startsWith('/')) {
    return Response.redirect(new URL('/', request.url))
  }

  if (!token && !pathname.startsWith('/auth/signin')) {
    console.log("Redirecting to signin", request.url)
    return Response.redirect(new URL('/auth/signin', request.url))
  }

  if (userSession) {

  }

}

export const config = {
  matcher: ['/auth/signin', '/admin/:path*'],
}
