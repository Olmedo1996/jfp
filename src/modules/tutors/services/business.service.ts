import { ICreateBusiness } from '../core/interfaces/business.interface';

import { api } from '@/lib/api';

export const businessService = {
  async businesses(data: ICreateBusiness): Promise<ICreateBusiness> {
    const response = await api.post<ICreateBusiness>(`businesses/`, data);
    return response.data;
  },
};
