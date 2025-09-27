import axios from 'axios';

import {
  baseApiInterceptor,
  externalApiErrorResponseInterceptor,
  internalApiErrorResponseInterceptor,
  internalApiInterceptor,
} from '@/modules/auth/utils/api-interceptors';

// API para comunicación con el backend externo (Django/FastAPI/etc.)
const baseApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// API para comunicación interna con NextJS (API routes)
const internalApi = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configurar interceptores para baseApi (comunicación con backend externo)
baseApi.interceptors.request.use(baseApiInterceptor);
baseApi.interceptors.response.use(
  (response) => response,
  externalApiErrorResponseInterceptor
);

// Configurar interceptores para internalApi (comunicación interna NextJS)
internalApi.interceptors.request.use(internalApiInterceptor);
internalApi.interceptors.response.use(
  (response) => response,
  internalApiErrorResponseInterceptor
);

// Exportar las instancias configuradas
export { baseApi as api, internalApi };
