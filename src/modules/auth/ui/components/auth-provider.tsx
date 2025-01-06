'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data } = useSession();
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  });
  return <>{children}</>;
};

export default AuthProvider;
