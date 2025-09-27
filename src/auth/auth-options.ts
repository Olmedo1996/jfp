import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AUTH_ROUTES, TOKEN_CONFIG } from './constants';

import { authService } from '@/modules/auth/services/auth.service';

// Función para refrescar el token de acceso
const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token available');
    }

    const refreshed = await authService.refresh(token.refreshToken);

    if (!refreshed.access) {
      throw new Error('No access token received');
    }

    return {
      ...token,
      accessToken: refreshed.access,
      refreshToken: refreshed.refresh || token.refreshToken,
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

          return {
            id: data.tutor.id.toString(),
            name: data.tutor.user.username,
            email: data.tutor.user.email,
            firstName: data.tutor.user.first_name,
            lastName: data.tutor.user.last_name,
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
      // Inicio de sesión inicial
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      // Verificar si el token está próximo a expirar
      const now = Date.now();
      const tokenIssuedAt = token.iat ? Number(token.iat) * 1000 : now;
      const tokenAge = now - tokenIssuedAt;
      const expirationTime = Number(TOKEN_CONFIG.EXPIRATION_TIME);
      const refreshThreshold = Number(TOKEN_CONFIG.REFRESH_THRESHOLD);

      // Si el token está próximo a expirar, intentar refrescar
      if (tokenAge > expirationTime - refreshThreshold) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      if (token.error) {
        session.error = token.error;
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
  pages: {
    signIn: AUTH_ROUTES.LOGIN,
    error: AUTH_ROUTES.ERROR,
  },
  session: {
    strategy: 'jwt',
    maxAge: TOKEN_CONFIG.MAX_AGE,
  },
  debug: process.env.NODE_ENV === 'development',
};
