'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

import { TransitionProvider } from '@/context/tansition-context';
import AuthProvider from '@/modules/auth/ui/components/auth-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <SessionProvider refetchOnWindowFocus={false} refetchInterval={30}>
        <AuthProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
