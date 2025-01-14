import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { handleApiError } from '@/utils/error-handler';

interface Tokens {
  access: string;
  refresh: string;
}

const createAxiosInstance = (tokens?: Tokens) => {
  const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true,
  });

  api.interceptors.request.use(
    async (config) => {
      const accessToken = tokens?.access || getCookie('access_token');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      // Solo intentamos refresh token si es error 401 y no es un retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getCookie('refresh_token');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post<Tokens>(
            `${api.defaults.baseURL}auth/refresh/`,
            { refresh: refreshToken }
          );

          const { access, refresh } = response.data;
          setCookie('access_token', access);
          setCookie('refresh_token', refresh);

          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${access}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          deleteCookie('access_token');
          deleteCookie('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      handleApiError(error);
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createAxiosInstance();
