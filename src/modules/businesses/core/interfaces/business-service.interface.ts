import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';

export interface BusinessResult {
  id: number;
  name: string;
  ruc_ci: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export type ApiBusinessResponse = IResponseApiListViewGet<BusinessResult>;

export type ApiBusinessRequestParams = GenericRequestParams;
