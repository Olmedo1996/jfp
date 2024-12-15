// import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
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
        const cookieStore = await cookies();
        if (data?.access) {
          // Almacenar tokens en cookies
          cookieStore.set('access_token', data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 día
          });

          cookieStore.set('refresh_token', data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 días
          });
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
      const cookieStore = await cookies();

      // Refrescar token si está expirado
      try {
        const refreshed = await authService.refresh(token.refreshToken || '');
        // Actualizar cookies
        cookieStore.set('access_token', refreshed.access, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 1 día
        });

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
