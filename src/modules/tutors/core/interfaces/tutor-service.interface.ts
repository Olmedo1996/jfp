import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';

export interface Result {
  id: number;
  user: User;
  dni: string;
  phone: string;
  address: string;
  specialization: string;
  birth_date: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  full_name: string;
}

export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type ApiTutorResponse = IResponseApiListViewGet<Result>;

export type ApiTutorRequestParams = GenericRequestParams;
