import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/employer/dashboard',
  '/employer/new',
  '/employer/applications',
]

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname

  if (protectedRoutes.includes(pathname)) {
    const role = request.cookies.get('loggedInRole')?.value

    if (role !== 'employer') {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/employer/dashboard',
    '/employer/new',
    '/employer/applications',
  ],
}
