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
    create:
      'border-l-8 border-green-500 text-zinc-800 dark:border-green-600 dark:text-zinc-300',
    update:
      'border-l-8 border-green-500 text-zinc-800 dark:border-green-600 dark:text-zinc-300',
    delete:
      'border-l-8 border-green-500 text-zinc-800 dark:border-green-600 dark:text-zinc-300',
  };

  toast({
    title: 'Operación exitosa',
    description: messages[action],
    className: colors[action],
  });
};
