import { useMutation, useQueryClient } from '@tanstack/react-query';

import { branchService } from '@/modules/branches/services/branch.service';
import { showSuccessToast } from '@/utils/toast-messages';

export function useRejectTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => branchService.delete(id),
    onSuccess: () => {
      // Invalidar y refetch de la lista de beneficiarios
      queryClient.invalidateQueries({ queryKey: ['activities_transfer'] });
      showSuccessToast('Traslado rechazado', 'delete');
    },
  });
}
