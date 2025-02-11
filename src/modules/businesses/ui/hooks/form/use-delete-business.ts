import { useMutation, useQueryClient } from '@tanstack/react-query';

import { businessService } from '@/modules/businesses/services/business.service';
import { showSuccessToast } from '@/utils/toast-messages';

export function useDeleteBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => businessService.delete(id),
    onSuccess: () => {
      // Invalidar y refetch de la lista de beneficiarios
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      showSuccessToast('Empresa eliminada', 'delete');
    },
  });
}
