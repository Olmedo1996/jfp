import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';
import { ISelectOption } from '@/interface/select-option';

export interface BranchResult {
  id: number;
  name: string;
  code: string;
  phone: string;
  address: string;
  is_active: boolean;
  business_selector: ISelectOption<number>;
  created_at: Date;
  updated_at: Date;
}

export type ApiBranchResponse = IResponseApiListViewGet<BranchResult>;

export type ApiBranchRequestParams = GenericRequestParams;
