import { LoginResponse } from '../core/interface/login.interface';

import axios from '@/modules/auth/services/api';

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>('auth/login/', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      //   console.error('Error en login:', error.response?.data || error.message);
      throw new Error('Login failed');
    }
  },

  async refresh(refreshToken: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`auth/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  },
};
