import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FamilyMemberFormData } from '../../../core/schemas/family-member.schema';
import { familyMemberService } from '../../../services/family-member.service';

import { toast } from '@/components/ui/use-toast';
import { showSuccessToast } from '@/utils/toast-messages';

export const useUpdateFamilyMember = (beneficiaryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; formData: FamilyMemberFormData }) => {
      return familyMemberService.update(data.id, data.formData);
    },
    onSuccess: () => {
      showSuccessToast('Family member updated successfully', 'update');
      queryClient.invalidateQueries({
        queryKey: ['family-members', beneficiaryId],
      });
    },
    onError: () => {
      toast({
        title: 'Error updating family member',
        description: 'Please try again',
        variant: 'destructive',
      });
    },
  });
};
