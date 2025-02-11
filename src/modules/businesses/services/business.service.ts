import {
  ICreateBusiness,
  IUpdateBusiness,
} from '../core/interfaces/business.interface';
import {
  ApiBusinessRequestParams,
  ApiBusinessResponse,
  BusinessResult,
} from '../core/interfaces/business-service.interface';

import { api } from '@/lib/api';
import { serverApi } from '@/lib/server-api';

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

  async get(id: BusinessResult['id']): Promise<BusinessResult> {
    try {
      const response = await serverApi.get<BusinessResult>(
        `businesses/${id}/`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error('Error getting beneficiary:', error);
      throw error;
    }
  },

  async update(
    id: BusinessResult['id'],
    data: IUpdateBusiness
  ): Promise<IUpdateBusiness> {
    try {
      const response = await api.put<IUpdateBusiness>(
        `businesses/${id}/`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error update business:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`businesses/${id}/`);
    } catch (error) {
      console.error('Error deleting business:', error);
      throw error;
    }
  },
};
