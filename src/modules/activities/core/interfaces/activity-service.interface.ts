import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';

export interface ActivityResult {
  id: number;
  end_date: string;
  notes: string;
  activity_status: number;
  business: number;
  tutor: number;
  beneficiary: number;
  created_at: Date;
  updated_at: Date;
  activity_status_data: string;
  beneficiary_data: string;
  start_date: string;
  tutor_full_name: string;
}

export type ApiBusinessResponse = IResponseApiListViewGet<ActivityResult>;

export type ApiBusinessRequestParams = GenericRequestParams;
