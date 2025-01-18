import { useMutation, useQueryClient } from '@tanstack/react-query';

import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import { showSuccessToast } from '@/utils/toast-messages';

export function useDeleteBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => beneficiariesService.delete(id),
    onSuccess: () => {
      // Invalidar y refetch de la lista de beneficiarios
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      showSuccessToast('Beneficiario eliminado', 'delete');
    },
  });
}
