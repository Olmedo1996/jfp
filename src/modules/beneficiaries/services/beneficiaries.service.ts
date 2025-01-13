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

  async listView(
    params?: ApiBeneficiariesRequestParams
  ): Promise<ApiBeneficiariesResponse> {
    const response = await api.get<ApiBeneficiariesResponse>(`beneficiaries/`, {
      params,
    });
    return response.data;
  },
};
