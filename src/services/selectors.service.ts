import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';
import { api } from '@/lib/api';

export type SelectOption = {
  value: number;
  label: string;
};

export interface ApiGenericSelectorsRequestParams extends GenericRequestParams {
  endpoint: string;
}

export type ApiGenericSelectorResponse = IResponseApiListViewGet<SelectOption>;

export interface CreateItemParams<TData> {
  endpoint: string;
  data: TData;
}

export const selectorsService = {
  async listView(
    params: ApiGenericSelectorsRequestParams
  ): Promise<ApiGenericSelectorResponse> {
    const { endpoint, ...rest } = params;
    const response = await api.get<ApiGenericSelectorResponse>(`${endpoint}`, {
      params: rest,
    });
    return response.data;
  },

  async createItem<TData>(
    params: CreateItemParams<TData>
  ): Promise<SelectOption> {
    const { endpoint, data } = params;
    const response = await api.post<SelectOption>(`${endpoint}`, data);
    return response.data;
  },
};
