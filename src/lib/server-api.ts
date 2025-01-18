'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import { handleApiError } from '@/utils/error-handler';

const createServerApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true,
  });

  // Interceptor de solicitud para el servidor
  api.interceptors.request.use(
    async (config) => {
      const cookieStore = cookies();
      const accessToken = cookieStore.get('access_token');

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de respuesta simplificado para el servidor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      handleApiError(error);
      return Promise.reject(error);
    }
  );

  return api;
};

export const serverApi = createServerApi();
