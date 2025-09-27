import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { authOptions } from '@/auth/auth-options';
import { isClientSide } from '@/utils/util-helper';

/**
 * Obtiene el token de acceso desde NextAuth
 * Compatible tanto en cliente como en servidor
 */
export const getApiToken = async (): Promise<string | null> => {
  try {
    if (isClientSide()) {
      const session = await getSession();
      return session?.user?.accessToken || null;
    } else {
      const session = await getServerSession(authOptions);
      return session?.user?.accessToken || null;
    }
  } catch (error) {
    console.error('Error getting API token:', error);
    return null;
  }
};

/**
 * Obtiene el token de acceso desde NextAuth (solo cliente)
 */
export const getApiTokenClient = async (): Promise<string | null> => {
  try {
    if (!isClientSide()) {
      console.warn('getApiTokenClient called on server side');
      return null;
    }

    const session = await getSession();
    return session?.user?.accessToken || null;
  } catch (error) {
    console.error('Error getting client API token:', error);
    return null;
  }
};

/**
 * Obtiene información completa de la sesión
 */
export const getSessionInfo = async () => {
  try {
    if (isClientSide()) {
      const session = await getSession();
      return {
        session,
        accessToken: session?.user?.accessToken,
        refreshToken: session?.user?.refreshToken,
        hasError: !!session?.error,
      };
    } else {
      const session = await getServerSession(authOptions);
      return {
        session,
        accessToken: session?.user?.accessToken,
        refreshToken: session?.user?.refreshToken,
        hasError: !!session?.error,
      };
    }
  } catch (error) {
    console.error('Error getting session info:', error);
    return {
      session: null,
      accessToken: null,
      refreshToken: null,
      hasError: true,
    };
  }
};
