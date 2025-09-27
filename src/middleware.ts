import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { API_AUTH_ROUTES, AUTH_ROUTES, PUBLIC_ROUTES } from '@/auth/constants';
import { middleware as paraglide } from '@/lib/i18n';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Aplicar middleware de i18n primero
  const i18nResponse = paraglide(request);

  // Verificar si es una ruta de API de autenticación
  const isApiAuthRoute = API_AUTH_ROUTES.some((route: string) =>
    pathname.startsWith(route)
  );

  if (isApiAuthRoute) {
    return i18nResponse;
  }

  // Verificar si es una ruta pública
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route: string) => pathname === route || pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return i18nResponse;
  }

  // Verificar token de autenticación
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL(AUTH_ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);

    const response = NextResponse.redirect(loginUrl);

    // Preservar headers de i18n
    if (i18nResponse?.headers) {
      i18nResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
      });
    }

    return response;
  }

  // Usuario autenticado, continuar con la request
  return i18nResponse;
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
