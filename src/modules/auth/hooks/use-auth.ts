import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { loginSchema, LoginSchemaType } from '../core/schema/login.schema';

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

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
        setError('Credenciales inválidas');
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Ocurrió un error al intentar iniciar sesión');
      setIsLoading(false);
    } /* finally {
      setIsLoading(false);
    } */
  };

  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return { methods, login, isLoading, error };
};
