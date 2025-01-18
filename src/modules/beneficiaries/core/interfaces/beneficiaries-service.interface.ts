import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';
import { ISelectOption } from '@/interface/select-option';

export interface BeneficiaryResult {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  birth_date: string;
  children_count: number;
  notes: string;
  education_level: ISelectOption<number>;
  gender: ISelectOption<number>;
  created_at: Date;
  updated_at: Date;
  full_name?: string;
}

export type ApiBeneficiariesResponse =
  IResponseApiListViewGet<BeneficiaryResult>;

export type ApiBeneficiariesRequestParams = GenericRequestParams;
