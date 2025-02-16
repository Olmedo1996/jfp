import {
  ICreateContact,
  IUpdateContact,
} from '../core/interfaces/contact.interface';
import {
  ApiContactRequestParams,
  ApiContactResponse,
  ContactResult,
} from '../core/interfaces/contact-service.interface';

import { api } from '@/lib/api';
import { serverApi } from '@/lib/server-api';

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

  async update(
    id: ContactResult['id'],
    data: IUpdateContact
  ): Promise<IUpdateContact> {
    try {
      const response = await api.put<IUpdateContact>(`contacts/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error update contact:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`contacts/${id}/`);
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },

  async get(id: ContactResult['id']): Promise<ContactResult> {
    try {
      const response = await serverApi.get<ContactResult>(
        `contacts/${id}/`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error('Error getting contact:', error);
      throw error;
    }
  },
};
