import { NextResponse } from 'next/server'
import { auth } from "@/auth"

export async function middleware(request) {
  const session = await auth()
  
  // Permitir acceso a la ruta raíz "/"
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next()
  }

  // Proteger la ruta "/playground"
  if (request.nextUrl.pathname.startsWith("/playground")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/playground/:path*"]
}