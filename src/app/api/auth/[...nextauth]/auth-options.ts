import { cookies } from 'next/headers';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authService } from '@/modules/auth/services/auth.service';

// Función auxiliar para verificar si el token está próximo a expirar
const isTokenExpiringSoon = (expiryTime: number): boolean => {
  const timeUntilExpiry = expiryTime - Date.now();
  return timeUntilExpiry <= 30 * 1000; // 30 segundos
};

// Función para actualizar las cookies
const updateAuthCookies = async (
  accessToken: string,
  refreshToken?: string
) => {
  const cookieStore = cookies();

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 día
  });

  if (refreshToken) {
    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
  }
};

// Función para manejar el refresh del token
const refreshAccessToken = async (token: JWT) => {
  try {
    const refreshed = await authService.refresh(token.refreshToken as string);
    await updateAuthCookies(refreshed.access);

    return {
      ...token,
      accessToken: refreshed.access,
      accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
      error: undefined,
    };
  } catch (error) {
    console.error('Refresh token error:', error);
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
        try {
          const data = await authService.login(
            credentials?.username || '',
            credentials?.password || ''
          );

          if (!data?.access) {
            throw new Error('Invalid credentials');
          }
          console.log(data);
          await updateAuthCookies(data.access, data.refresh);

          return {
            id: data.tutor.id.toString(),
            name: data.tutor.user.username,
            accessToken: data.access,
            refreshToken: data.refresh,
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
      // Si es login inicial
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
        };
      }

      // Si el token tiene error, no intentar refresh
      if (token.error) {
        return token;
      }

      // Verificar si el token está próximo a expirar
      if (
        token.accessTokenExpires &&
        isTokenExpiringSoon(token.accessTokenExpires)
      ) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };

      // Si hay error en el token, marcar la sesión como expirada
      if (token.error) {
        session.error = token.error;
      }

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
