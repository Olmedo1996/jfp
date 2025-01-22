import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';

export interface IFamilyMember {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  phone: string;
  address: string;
  beneficiary: number;
  is_active: boolean;
}

export type ApiFamilyMembersResponse = IResponseApiListViewGet<IFamilyMember>;

export type ApiBeneficiariesRequestParams = GenericRequestParams;
