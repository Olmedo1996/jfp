import { ICreateBusiness } from '../core/interfaces/business.interface';
import {
  ApiBusinessRequestParams,
  ApiBusinessResponse,
} from '../core/interfaces/business-service.interface';

import { api } from '@/lib/api';

export const businessService = {
  async create(data: ICreateBusiness): Promise<ICreateBusiness> {
    try {
      const response = await api.post<ICreateBusiness>(`businesses/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating business:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
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
