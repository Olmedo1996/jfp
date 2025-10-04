export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ERROR: '/auth/error',
} as const;

export const PUBLIC_ROUTES = [
  AUTH_ROUTES.LOGIN,
  AUTH_ROUTES.REGISTER,
  AUTH_ROUTES.FORGOT_PASSWORD,
] as const;

export const API_AUTH_ROUTES = ['/api/auth'] as const;

export const TOKEN_CONFIG = {
  // Tiempo de expiración del token JWT (24 horas)
  MAX_AGE: 24 * 60 * 60, // 24 horas en segundos
  // Umbral para refrescar el token (5 minutos antes de expirar)
  REFRESH_THRESHOLD: 1 * 60 * 1000, // 5 minutos en milisegundos
  // Tiempo de expiración estimado del token (24 horas)
  EXPIRATION_TIME: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
} as const;
