import { ICreateActivity } from '../core/interfaces/activity.interface';
import {
  ApiBusinessRequestParams,
  ApiBusinessResponse,
} from '../core/interfaces/activity-service.interface';

import { api } from '@/lib/api';

export const activityService = {
  async create(data: ICreateActivity): Promise<ICreateActivity> {
    try {
      const response = await api.post<ICreateActivity>(`activities/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating activity:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async listView(
    params?: ApiBusinessRequestParams
  ): Promise<ApiBusinessResponse> {
    const response = await api.get<ApiBusinessResponse>(`activities/`, {
      params,
    });
    return response.data;
  },

  async listTransfer(
    params?: ApiBusinessRequestParams
  ): Promise<ApiBusinessResponse> {
    const response = await api.get<ApiBusinessResponse>(
      `activities/transfers/`,
      {
        params,
      }
    );
    return response.data;
  },
};
