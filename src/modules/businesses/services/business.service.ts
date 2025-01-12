import { ICreateBusiness } from '../core/interfaces/business.interface';
import {
  ApiBusinessRequestParams,
  ApiBusinessResponse,
} from '../core/interfaces/business-service.interface';

import { api } from '@/lib/api';

export const businessService = {
  async businesses(data: ICreateBusiness): Promise<ICreateBusiness> {
    const response = await api.post<ICreateBusiness>(`businesses/`, data);
    return response.data;
  },

  async listView(
    params?: ApiBusinessRequestParams
  ): Promise<ApiBusinessResponse> {
    const response = await api.get<ApiBusinessResponse>(`businesses/`, {
      params,
    });
    return response.data;
  },
};
