'use client';
import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const session = useSession();
  useEffect(() => {
    if (
      session.data?.error === 'TokenExpiredError' ||
      session.data?.error === 'RefreshAccessTokenError'
    ) {
      signOut();
    }
  }, [session.data?.error]);
  return <>{children}</>;
};

export default AuthProvider;
