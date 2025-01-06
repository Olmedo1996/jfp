'use server';

import { signIn, signOut } from 'next-auth/react';
import { ZodError } from 'zod';

import { loginSchema } from '@/modules/auth/core/schema/login.schema';

interface LoginFormData {
  email: string;
  password: string;
}

const defaultValues: LoginFormData = {
  email: '',
  password: '',
};

interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string>;
}

interface SuccessResponse {
  message: string;
  errors: Record<string, never>;
}

type LoginResponse = SuccessResponse | ValidationErrorResponse;

export async function login(
  prevState: LoginFormData,
  formData: FormData
): Promise<LoginResponse> {
  try {
    // Convertir FormData a un objeto
    const data: LoginFormData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Validar los datos
    const validatedFields = loginSchema.safeParse(data);

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      return {
        message: 'validation error',
        errors: Object.entries(fieldErrors).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value?.join(', ') || '',
          }),
          {}
        ),
      };
    }

    // Realizar signIn
    const result = await signIn('credentials', {
      redirect: false, // Evita redirección automática
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      return {
        message: 'credentials error',
        errors: {
          ...defaultValues,
          credentials: 'Incorrect email or password',
        },
      };
    }

    return {
      message: 'success',
      errors: {},
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors;

      const errors: Record<string, string> = Object.entries(fieldErrors).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value?.join(', ') || '',
        }),
        {} as Record<string, string>
      );

      return {
        message: 'validation error',
        errors,
      };
    }

    console.error('Unexpected error:', error);
    return {
      message: 'unknown error',
      errors: {
        unknown: 'An unknown error occurred',
      },
    };
  }
}

export async function logout() {
  await signOut();
}
