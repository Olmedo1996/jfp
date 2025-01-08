import { ICreateTutor } from '../core/interfaces/tutor.interface';

import { api } from '@/lib/api';

export const tutorService = {
  async tutor(data: ICreateTutor): Promise<ICreateTutor> {
    const response = await api.post<ICreateTutor>(`tutors/`, data);
    return response.data;
  },
};
