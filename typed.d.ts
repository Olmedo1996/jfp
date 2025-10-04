import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    error?: 'RefreshAccessTokenError' | 'TokenExpiredError' | string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    email?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: 'RefreshAccessTokenError' | 'TokenExpiredError' | string;
  }
}
