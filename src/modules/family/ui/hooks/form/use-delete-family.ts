import { useMutation, useQueryClient } from '@tanstack/react-query';

import { familyMemberService } from '../../../services/family-member.service';

import { toast } from '@/components/ui/use-toast';
import { showSuccessToast } from '@/utils/toast-messages';

export const useDeleteFamilyMember = (beneficiaryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return familyMemberService.delete(id);
    },
    onSuccess: () => {
      showSuccessToast('Family member deleted successfully', 'delete');
      queryClient.invalidateQueries({
        queryKey: ['family-members', beneficiaryId],
      });
    },
    onError: () => {
      toast({
        title: 'Error deleting family member',
        description: 'Please try again',
        variant: 'destructive',
      });
    },
  });
};
