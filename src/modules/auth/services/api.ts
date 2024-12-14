import axios from 'axios';

// import { env } from '@/env.mjs';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // No necesitas manejar tokens manualmente, ya que se enviarán con las cookies
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response, // Devuelve la respuesta si todo está bien
  async (error) => {
    if (error.response?.status === 401) {
      // Si se recibe un 401, el token puede haber expirado
      console.error(
        'Unauthorized request. Please ensure the user is logged in.'
      );
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
