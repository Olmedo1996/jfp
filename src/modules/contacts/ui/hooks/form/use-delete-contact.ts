import { useMutation, useQueryClient } from '@tanstack/react-query';

import { contactService } from '@/modules/contacts/services/contact.service';
import { showSuccessToast } from '@/utils/toast-messages';

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contactService.delete(id),
    onSuccess: () => {
      // Invalidar y refetch de la lista de beneficiarios
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      showSuccessToast('Contacto eliminado', 'delete');
    },
  });
}
