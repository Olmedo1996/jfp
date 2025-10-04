import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AUTH_ROUTES, TOKEN_CONFIG } from './constants';

import { authService } from '@/modules/auth/services/auth.service';

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token available');
    }

    const refreshed = await authService.refresh(token.refreshToken);

    return {
      ...token,
      accessToken: refreshed.access,
      refreshToken: refreshed.refresh ?? token.refreshToken,
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
          return null;
        }

        try {
          const data = await authService.login(
            credentials.username,
            credentials.password
          );

          if (!data?.access || !data?.tutor) {
            return null;
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
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const decodedToken = jwtDecode(user?.accessToken ?? '');
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: (decodedToken?.exp || 0) * 1000,
          user: user,
        };
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token.error) {
        session.error = token.error;
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
};
