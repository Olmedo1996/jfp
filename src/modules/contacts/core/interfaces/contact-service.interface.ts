import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';

export interface ContactResult {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  is_primary_contact: boolean;
  branch: number;
  created_at: Date;
  updated_at: Date;
}

export type ApiContactResponse = IResponseApiListViewGet<ContactResult>;

export type ApiContactRequestParams = GenericRequestParams;
