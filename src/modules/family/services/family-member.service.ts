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

  async update(
    id: number,
    data: Omit<IFamilyMember, 'id'>
  ): Promise<IFamilyMember> {
    try {
      const response = await api.put<IFamilyMember>(
        `family-members/${id}/`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error update family member:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`family-members/${id}/`);
    } catch (error) {
      console.error('Error deleting family member:', error);
      throw error;
    }
  },

  async list(beneficiaryId: number): Promise<ApiFamilyMembersResponse> {
    const response = await api.get<ApiFamilyMembersResponse>(
      `family-members/?beneficiary=${beneficiaryId}`
    );
    return response.data;
  },
};
