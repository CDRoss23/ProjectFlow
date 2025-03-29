import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Rutas públicas
  if (['/', '/login', '/register', '/api/auth'].includes(pathname)) {
    return NextResponse.next();
  }

  // Verificar autenticación para rutas protegidas
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (!session) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}