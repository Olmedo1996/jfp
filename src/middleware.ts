import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { middleware as paraglide } from '@/lib/i18n';

// Array de rutas públicas que no requieren autenticación
const publicRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const i18nResponse = paraglide(request);

  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route
  );

  if (isPublicRoute) {
    return i18nResponse;
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);

    const response = NextResponse.redirect(loginUrl);

    if (i18nResponse?.headers) {
      i18nResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
      });
    }

    return response;
  }

  // Si hay token, permitimos el acceso y aplicamos paraglide
  return i18nResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
