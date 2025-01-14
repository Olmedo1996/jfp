import { ICreateTutor } from '../core/interfaces/tutor.interface';
import {
  ApiTutorRequestParams,
  ApiTutorResponse,
} from '../core/interfaces/tutor-service.interface';

import { api } from '@/lib/api';

export const tutorService = {
  async create(data: ICreateTutor): Promise<ICreateTutor> {
    try {
      const response = await api.post<ICreateTutor>(`tutors/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating business:', error);
      throw error;
    }
  },

  async listView(params?: ApiTutorRequestParams): Promise<ApiTutorResponse> {
    const response = await api.get<ApiTutorResponse>(`tutors/`, { params });
    return response.data;
  },
};
