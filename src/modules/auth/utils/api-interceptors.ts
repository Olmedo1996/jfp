import type { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

import { getApiToken, getApiTokenClient } from './token-helper';

import { AUTH_ROUTES } from '@/auth/constants';
import { isClientSide } from '@/utils/util-helper';

export const baseApiInterceptor = async (
  config: InternalAxiosRequestConfig
) => {
  const isClient = isClientSide();

  if (isClient) {
    const token = await getApiTokenClient();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const token = await getApiToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
};

/**
 * Interceptor interno para comunicación con APIs de NextJS
 * Se usa para llamadas internas (API routes de Next.js)
 */
export const internalApiInterceptor = async (
  config: InternalAxiosRequestConfig
) => {
  const isClient = isClientSide();

  if (isClient) {
    const token = await getApiTokenClient();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
};

/**
 * Interceptor de manejo de errores para API interna
 * Maneja errores específicos de la aplicación NextJS
 */
export const internalApiErrorResponseInterceptor = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;

    switch (status) {
      case 401:
        if (isClientSide()) {
          const currentUrl = window.location.href;
          const searchParams = new URLSearchParams();
          searchParams.append('callbackUrl', currentUrl);
          window.location.href = `${AUTH_ROUTES.LOGIN}?${searchParams.toString()}`;
        }
        break;

      case 403:
        // Sin permisos suficientes
        console.error('Access forbidden - insufficient permissions');
        break;

      case 404:
        // Recurso no encontrado
        console.error('Resource not found');
        break;

      case 429:
        // Rate limit excedido
        console.error('Too many requests - rate limit exceeded');
        break;

      case 500:
        // Error interno del servidor
        console.error('Internal server error');
        break;

      default:
        console.error(`API Error: ${status}`);
    }
  } else if (error.request) {
    // Error de Re.d
    console.error('Network error - no response received');
  } else {
    // Error en la configuración de la request
    console.error('Request configuration error:', error.message);
  }

  return Promise.reject(error);
};

/**
 * Interceptor de manejo de errores para API externa
 * Maneja errores específicos del backend externo
 */
export const externalApiErrorResponseInterceptor = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;

    switch (status) {
      case 401:
        console.error('Authentication failed - token may be expired');
        if (isClientSide()) {
          window.location.href = `${AUTH_ROUTES.LOGIN}?expired=true`;
        }
        break;

      case 403:
        console.error('Access forbidden by backend');
        break;

      case 404:
        console.error('Backend resource not found');
        break;

      case 422:
        // Error de validación del backend
        console.error('Backend validation error:', error.response.data);
        break;

      case 500:
        console.error('Backend server error');
        break;

      case 502:
      case 503:
      case 504:
        // Errores de infraestructura
        console.error('Backend service unavailable');
        break;

      default:
        console.error(`Backend API Error: ${status}`);
    }
  }

  return Promise.reject(error);
};
