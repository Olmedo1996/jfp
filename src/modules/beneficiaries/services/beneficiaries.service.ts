import { ICreateBeneficiary } from '../core/interfaces/beneficiaries.interface';

import { api } from '@/lib/api';
import {
  ApiBeneficiariesRequestParams,
  ApiBeneficiariesResponse,
} from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';

export const beneficiariesService = {
  /* async create(data: ICreateTutor): Promise<ICreateTutor> {
    const response = await api.post<ICreateTutor>(`tutors/`, data);
    return response.data;
  }, */
  async create(data: ICreateBeneficiary): Promise<ICreateBeneficiary> {
    try {
      const response = await api.post<ICreateBeneficiary>(
        `beneficiaries/`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error creating business:', error);
      // El error ya será manejado por el interceptor
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
};
