import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

// Definir interfaces para tokens
interface Tokens {
  access: string;
  refresh: string;
}

// Crear una instancia de axios con configuración base
const createAxiosInstance = (tokens?: Tokens) => {
  const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true,
  });

  // Interceptor de solicitudes para añadir token de acceso
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

  // Interceptor de respuestas para manejar refresh token
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      // Manejar específicamente errores de autorización
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Intentar refrescar el token
          const refreshToken = getCookie('refresh_token');

          if (!refreshToken) {
            // Si no hay refresh token, forzar logout
            throw new Error('No refresh token available');
          }

          const response = await axios.post<Tokens>(
            `${api.defaults.baseURL}auth/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const { access, refresh } = response.data;

          // Guardar nuevos tokens en cookies
          setCookie('access_token', access);
          setCookie('refresh_token', refresh);

          // Actualizar el token en el encabezado de la solicitud original
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${access}`;
          }

          // Reintentar la solicitud original
          return api(originalRequest);
        } catch (refreshError) {
          // Error al refrescar, hacer logout
          deleteCookie('access_token');
          deleteCookie('refresh_token');

          // Redirigir a login o manejar el error
          window.location.href = '/login';

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createAxiosInstance();
