import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      name?: string | null;
    };
    error?: string;
  }
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
