/**
 * Utility helper functions
 */

/**
 * Determina si el código se está ejecutando en el lado del cliente
 * @returns {boolean} true si está en el cliente, false si está en el servidor
 */
export const isClientSide = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Determina si el código se está ejecutando en el lado del servidor
 * @returns {boolean} true si está en el servidor, false si está en el cliente
 */
export const isServerSide = (): boolean => {
  return typeof window === 'undefined';
};

/**
 * Helper para logs que solo se muestran en desarrollo
 * @param message - Mensaje a mostrar
 * @param data - Datos adicionales opcionales
 */
export const devLog = (message: string, data?: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    if (data) {
      console.log(`[DEV] ${message}`, data);
    } else {
      console.log(`[DEV] ${message}`);
    }
  }
};

/**
 * Obtiene información del entorno actual
 */
export const getEnvironmentInfo = () => {
  return {
    isClient: isClientSide(),
    isServer: isServerSide(),
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  };
};
