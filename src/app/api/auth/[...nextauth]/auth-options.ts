import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authService } from '@/modules/auth/services/auth.service';

interface DecodedToken {
  exp: number;
  user_id: number;
  token_type: string;
}

// Función para decodificar y validar el token
const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Añadir 5 segundos de margen para compensar diferencias de tiempo
    return decoded.exp * 1000 > Date.now() + 5000;
  } catch {
    return false;
  }
};

// Función para obtener el tiempo de expiración del token
const getTokenExpiryTime = (token: string): number => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000;
  } catch {
    return 0;
  }
};

// Función para actualizar las cookies con tiempo de expiración dinámico
const updateAuthCookies = async (
  accessToken: string,
  refreshToken?: string
) => {
  const cookieStore = cookies();
  const accessTokenExpiry = getTokenExpiryTime(accessToken);
  const maxAge = Math.floor((accessTokenExpiry - Date.now()) / 1000);

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: maxAge > 0 ? maxAge : 3600, // Usar tiempo restante o 1 hora por defecto
  });

  if (refreshToken) {
    const refreshTokenExpiry = getTokenExpiryTime(refreshToken);
    const refreshMaxAge = Math.floor((refreshTokenExpiry - Date.now()) / 1000);

    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: refreshMaxAge > 0 ? refreshMaxAge : 7 * 24 * 3600, // Usar tiempo restante o 7 días por defecto
    });
  }
};

// Función mejorada para refrescar el token
const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token available');
    }

    const refreshed = await authService.refresh(token.refreshToken);

    if (!refreshed.access) {
      throw new Error('No access token received');
    }

    await updateAuthCookies(refreshed.access, refreshed.refresh);

    return {
      ...token,
      accessToken: refreshed.access,
      refreshToken: refreshed.refresh || token.refreshToken,
      accessTokenExpires: getTokenExpiryTime(refreshed.access),
      error: undefined,
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          const data = await authService.login(
            credentials.username,
            credentials.password
          );

          if (!data?.access || !data?.tutor) {
            throw new Error('Invalid response from server');
          }

          await updateAuthCookies(data.access, data.refresh);

          return {
            id: data.tutor.id.toString(),
            name: data.tutor.user.username,
            email: data.tutor.user.email,
            firstName: data.tutor.user.first_name,
            lastName: data.tutor.user.last_name,
            accessToken: data.access,
            refreshToken: data.refresh,
            accessTokenExpires: getTokenExpiryTime(data.access),
          };
        } catch (error) {
          console.error('Login error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // Return token if it's still valid
      if (
        token.accessToken &&
        token.accessTokenExpires &&
        token.accessTokenExpires > Date.now() + 30000
      ) {
        // 30 seconds margin
        return token;
      }

      // Token has expired or is about to expire, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.error) {
        // Si hay error en el token, incluir información en la sesión
        session.error = token.error;
        return session;
      }

      // Verificar la validez del token antes de actualizar la sesión
      if (token.accessToken && !isTokenValid(token.accessToken)) {
        session.error = 'TokenExpiredError';
        return session;
      }

      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };

      return session;
    },
  },
  events: {
    async signOut() {
      const cookieStore = cookies();
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 día
  },
  debug: process.env.NODE_ENV === 'development',
};
