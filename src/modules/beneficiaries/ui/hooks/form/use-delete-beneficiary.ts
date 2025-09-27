import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBeneficiaryAction } from '@/modules/beneficiaries/actions/beneficiaries.actions';
import { showErrorToast, showSuccessToast } from '@/utils/toast-messages';

export function useDeleteBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBeneficiaryAction(id),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
        showSuccessToast('Beneficiario eliminado', 'delete');
      } else {
        showErrorToast(result.error || 'Error al eliminar beneficiario');
      }
    },
    onError: (error) => {
      showErrorToast('Error al eliminar beneficiario');
      console.error('Delete error:', error);
    },
  });
}
