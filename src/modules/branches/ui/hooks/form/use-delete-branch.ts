import { useMutation, useQueryClient } from '@tanstack/react-query';

import { branchService } from '@/modules/branches/services/branch.service';
import { showSuccessToast } from '@/utils/toast-messages';

export function useDeleteBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => branchService.delete(id),
    onSuccess: () => {
      // Invalidar y refetch de la lista de beneficiarios
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      showSuccessToast('Sucursal eliminada', 'delete');
    },
  });
}
