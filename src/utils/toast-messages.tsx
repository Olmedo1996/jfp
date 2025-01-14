// src/lib/api/toast-messages.tsx
import { toast } from '@/components/ui/use-toast';

export const showSuccessToast = (
  entity: string,
  action: 'create' | 'update' | 'delete'
) => {
  const messages = {
    create: `${entity}`,
    update: `${entity}`,
    delete: `${entity}`,
  };

  const colors = {
    create: 'bg-green-500 text-zinc-800 dark:bg-green-600 dark:text-white',
    update: 'bg-yellow-500 text-zinc-800 dark:bg-yellow-600 dark:text-white',
    delete: 'bg-red-500 text-zinc-800 dark:bg-red-600 dark:text-white',
  };

  toast({
    title: 'Operación exitosa',
    description: messages[action],
    className: colors[action],
  });
};
