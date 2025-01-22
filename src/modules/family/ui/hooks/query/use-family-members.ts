// modules/family/ui/hooks/query/use-family-members.ts
import { useQuery } from '@tanstack/react-query';

import { familyMemberService } from '../../../services/family-member.service';

export const useFamilyMembers = (beneficiaryId: number) => {
  return useQuery({
    queryKey: ['family-members', beneficiaryId],
    queryFn: () => familyMemberService.list(beneficiaryId),
  });
};
