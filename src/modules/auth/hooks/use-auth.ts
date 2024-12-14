import { useState } from 'react';
import { signIn } from 'next-auth/react';

import { LoginSchemaType } from '../core/schema/login.schema';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginSchemaType) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return false;
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
