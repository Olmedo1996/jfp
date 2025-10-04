import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { API_AUTH_ROUTES, AUTH_ROUTES, PUBLIC_ROUTES } from '@/auth/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si es una ruta de API de autenticación
  const isApiAuthRoute = API_AUTH_ROUTES.some((route: string) =>
    pathname.startsWith(route)
  );

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Verificar si es una ruta pública
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route: string) => pathname === route || pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verificar token de autenticación
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL(AUTH_ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Usuario autenticado, continuar con la request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - except auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
