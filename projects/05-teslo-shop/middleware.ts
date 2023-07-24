/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse, type NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const previousPage: string = req.nextUrl.pathname

  if (previousPage.startsWith('/checkout')) {
    return validateToken(req, previousPage)
  }

  return NextResponse.next()
}

async function validateToken(req: NextRequest, previousPage: string): Promise<NextResponse> {
  const token: (string | undefined) = req.cookies.get("token")
  if (!token) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${previousPage}`, req.url)
    )
  }
  
  try {
    await jose.jwtVerify(
      token || '',
      new TextEncoder().encode(process.env.JWT_SECRET_SEED || '')
    )

    //If no error is thrown, the JWT is valid, you can even the payload if necessary
    return NextResponse.next()
  } catch (error) {
    console.error(`JWT Invalid or not signed in`, { error })

    const { protocol, host, pathname } = req.nextUrl

    return NextResponse.redirect(
      `${protocol}//${host}/auth/login?p=${pathname}`
    )
  }
}

export const config = {
  matcher: [
    '/checkout/:path*',
  ],
}
