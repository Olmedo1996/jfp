import {
  ICreateBeneficiary,
  IUpdateBeneficiary,
} from '../core/interfaces/beneficiaries.interface';

import { api } from '@/lib/api';
import { serverApi } from '@/lib/server-api';
import {
  ApiBeneficiariesRequestParams,
  ApiBeneficiariesResponse,
  BeneficiaryResult,
} from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';

export const beneficiariesService = {
  async create(data: ICreateBeneficiary): Promise<ICreateBeneficiary> {
    try {
      const response = await api.post<ICreateBeneficiary>(
        `beneficiaries/`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error creating beneficiary:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async update(
    id: BeneficiaryResult['id'],
    data: IUpdateBeneficiary
  ): Promise<IUpdateBeneficiary> {
    try {
      const response = await api.put<IUpdateBeneficiary>(
        `beneficiaries/${id}/`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error update beneficiary:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`beneficiaries/${id}/`);
    } catch (error) {
      console.error('Error deleting beneficiary:', error);
      throw error;
    }
  },

  async listView(
    params?: ApiBeneficiariesRequestParams
  ): Promise<ApiBeneficiariesResponse> {
    const response = await api.get<ApiBeneficiariesResponse>(`beneficiaries/`, {
      params,
    });
    return response.data;
  },

  async get(id: BeneficiaryResult['id']): Promise<BeneficiaryResult> {
    try {
      const response = await serverApi.get<BeneficiaryResult>(
        `beneficiaries/${id}/`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error('Error getting beneficiary:', error);
      throw error;
    }
  },
};
