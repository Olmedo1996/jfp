import { ICreateBranch } from '../core/interfaces/branch.interface';
import {
  ApiBranchRequestParams,
  ApiBranchResponse,
} from '../core/interfaces/branch-service.interface';

import { api } from '@/lib/api';

export const branchService = {
  async create(data: ICreateBranch): Promise<ICreateBranch> {
    try {
      const response = await api.post<ICreateBranch>(`branches/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating business:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },

  async listView(params?: ApiBranchRequestParams): Promise<ApiBranchResponse> {
    const response = await api.get<ApiBranchResponse>(`branches/`, {
      params,
    });
    return response.data;
  },
};
