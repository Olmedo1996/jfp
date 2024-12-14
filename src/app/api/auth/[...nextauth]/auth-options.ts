import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authService } from '@/modules/auth/services/auth.service';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const data = await authService.login(
          credentials?.username || '',
          credentials?.password || ''
        );
        if (data?.access) {
          return {
            id: data.tutor.id.toString(),
            name: data.tutor.user.username,
            accessToken: data.access,
            refreshToken: data.refresh,
          };
        }
        throw new Error('Invalid credentials');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 1 día
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Refrescar token si está expirado
      try {
        const refreshed = await authService.refresh(token.refreshToken || '');
        token.accessToken = refreshed.access;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
        return token;
      } catch (error) {
        console.log(error);
        token.error = 'RefreshAccessTokenError';
        return token;
      }
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: true,
};
