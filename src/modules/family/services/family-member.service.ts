// modules/family/services/family-member.service.ts
import {
  ApiFamilyMembersResponse,
  IFamilyMember,
} from '../core/interfaces/family-member.interface';

import { api } from '@/lib/api';

export const familyMemberService = {
  async create(data: Omit<IFamilyMember, 'id'>): Promise<IFamilyMember> {
    const response = await api.post<IFamilyMember>('family-members/', data);
    return response.data;
  },

  async list(beneficiaryId: number): Promise<ApiFamilyMembersResponse> {
    const response = await api.get<ApiFamilyMembersResponse>(
      `family-members/?beneficiary=${beneficiaryId}`
    );
    return response.data;
  },
};
