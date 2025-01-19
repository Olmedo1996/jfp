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
    create: 'border-l-8 border-green-500 text-zinc-800',
    update: 'border-l-8 border-green-500 text-zinc-800',
    delete: 'border-l-8 border-green-500 text-zinc-800',
  };

  toast({
    title: 'Operación exitosa',
    description: messages[action],
    className: colors[action],
  });
};
