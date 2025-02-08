import { ICreateContact } from '../core/interfaces/contact.interface';
import {
  ApiContactRequestParams,
  ApiContactResponse,
} from '../core/interfaces/contact-service.interface';

import { api } from '@/lib/api';

export const contactService = {
  async create(data: ICreateContact): Promise<ICreateContact> {
    try {
      const response = await api.post<ICreateContact>(`contacts/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating business:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async listView(
    params?: ApiContactRequestParams
  ): Promise<ApiContactResponse> {
    const response = await api.get<ApiContactResponse>(`contacts/`, {
      params,
    });
    return response.data;
  },
};
