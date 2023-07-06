/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // console.log(req.nextUrl)

  /* Validamos la ruta a la cual queremos aplicar las siguientes validaciones del middleware */
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    return validateMongoID(req)
  }

  return NextResponse.next()
}

function validateMongoID(req: NextRequest): NextResponse {
  // const id = req.nextUrl.pathname.split('/').pop()
  const id = req.nextUrl.pathname.replace('/api/entries/', '')
  
  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$")
  if (!checkMongoIDRegExp.test(id)) {
    const url = req.nextUrl.clone()
    url.pathname = '/api/bad-request'
    url.search = `?message=This id: ${id} is not a valid MongoID`

    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*', 
    '/api/entries/:path*'
  ],
}
