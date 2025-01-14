import { AxiosError } from 'axios';

import { toast } from '@/components/ui/use-toast';

interface ValidationError {
  [key: string]: string[] | ValidationError;
}

interface ApiError {
  detail?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const handleApiError = (error: AxiosError) => {
  if (!error.response) {
    toast({
      variant: 'destructive',
      title: 'Error de conexión',
      description:
        'No se pudo conectar con el servidor. Por favor, verifica tu conexión.',
    });
    return;
  }

  const status = error.response.status;
  const data = error.response.data as ApiError;

  switch (status) {
    case 400:
      handleValidationErrors(data);
      break;
    case 401:
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description:
          'Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión nuevamente.',
      });
      break;
    case 403:
      toast({
        variant: 'destructive',
        title: 'Acceso denegado',
        description: 'No tienes permisos para realizar esta acción.',
      });
      break;
    case 404:
      toast({
        variant: 'destructive',
        title: 'No encontrado',
        description: data.detail || 'El recurso solicitado no existe.',
      });
      break;
    case 500:
      toast({
        variant: 'destructive',
        title: 'Error del servidor',
        description:
          'Ha ocurrido un error en el servidor. Por favor, intenta más tarde.',
      });
      break;
    default:
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ha ocurrido un error inesperado.',
      });
  }
};

const handleValidationErrors = (errors: ValidationError) => {
  // Función recursiva para procesar errores anidados
  const processErrors = (obj: ValidationError): string[] => {
    return Object.entries(obj).reduce((acc: string[], [key, value]) => {
      if (Array.isArray(value)) {
        // Si es un array de errores, formatea cada mensaje
        return [...acc, ...value.map((msg) => `${key}: ${msg}`)];
      } else if (typeof value === 'object') {
        // Si es un objeto anidado, procesa recursivamente
        return [...acc, ...processErrors(value)];
      }
      return acc;
    }, []);
  };

  const errorMessages = processErrors(errors);

  // Muestra todos los errores de validación en un solo toast
  toast({
    variant: 'destructive',
    title: 'Error de validación',
    description: (
      <ul className="list-disc pl-4">
        {errorMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    ),
  });
};
