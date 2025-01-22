import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FamilyMemberFormData } from '../../../core/schemas/family-member.schema';
import { familyMemberService } from '../../../services/family-member.service';

import { toast } from '@/components/ui/use-toast';
import { showSuccessToast } from '@/utils/toast-messages';

export const useCreateFamily = (beneficiaryId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FamilyMemberFormData) => {
      return familyMemberService.create({
        ...data,
        beneficiary: beneficiaryId,
      });
    },
    onSuccess: () => {
      showSuccessToast('Family member added successfully', 'create');
      queryClient.invalidateQueries({
        queryKey: ['family-members', beneficiaryId],
      });
    },
    onError: () => {
      toast({
        title: 'Error creating family member',
        description: 'Please try again',
        className: 'border-l-8 border-green-500 text-zinc-800',
      });
    },
  });

  return mutation;
};
