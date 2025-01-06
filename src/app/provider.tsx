'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

import AuthProvider from '@/modules/auth/ui/components/auth-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <SessionProvider refetchOnWindowFocus={false} refetchInterval={30}>
        <AuthProvider>{children}</AuthProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
