import {
  ICreateBranch,
  IUpdateBranch,
} from '../core/interfaces/branch.interface';
import {
  ApiBranchRequestParams,
  ApiBranchResponse,
  BranchResult,
} from '../core/interfaces/branch-service.interface';

import { api } from '@/lib/api';
import { serverApi } from '@/lib/server-api';

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

  /**
   * Obtiene una sucursal por su id.
   * @param id Id de la sucursal a obtener.
   * @returns La sucursal obtenida.
   * @throws Error si no se puede obtener la sucursal.
   */
  async get(id: BranchResult['id']): Promise<BranchResult> {
    try {
      const response = await serverApi.get<BranchResult>(`branches/${id}/`, {});
      return response.data;
    } catch (error) {
      console.error('Error getting branch:', error);
      throw error;
    }
  },

  async update(
    id: BranchResult['id'],
    data: IUpdateBranch
  ): Promise<IUpdateBranch> {
    try {
      const response = await api.put<IUpdateBranch>(`branches/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error update branch:', error);
      // El error ya será manejado por el interceptor
      throw error;
    }
  },
};
