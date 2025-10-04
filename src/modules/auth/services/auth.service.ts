import axios from 'axios';

import { LoginResponse } from '../core/interface/login.interface';

import { env } from '@/env.mjs';

const authApi = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await authApi.post<LoginResponse>('auth/login/', {
      username,
      password,
    });
    return response.data;
  },

  async refresh(refreshToken: string): Promise<LoginResponse> {
    const response = await authApi.post<LoginResponse>('auth/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  },
};
