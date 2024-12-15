import { LoginResponse } from '../core/interface/login.interface';

import { api } from '@/lib/api';

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('auth/login/', {
      username,
      password,
    });
    return response.data;
  },

  async refresh(refreshToken: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(`auth/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  },
};
