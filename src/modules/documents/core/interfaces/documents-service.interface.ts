import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';
import { ISelectOption } from '@/interface/select-option';

export interface DocumentResult {
  id: number;
  name: string;
  description: string;
  file: string;
  file_size: number;
  file_size_display: string;
  document_type: ISelectOption<number>;
  folder: ISelectOption<number>;
  uploaded_by: number;
  uploaded_by_name: string;
  is_active: boolean;
  is_archived: boolean;
  expiration_date: null;
  created_at: Date;
  updated_at: Date;
  beneficiary: number;
}

interface ExtraRequestParam {
  beneficiary: number;
}

export type ApiDocumentsResponse = IResponseApiListViewGet<DocumentResult>;

export type ApiDocumentsRequestParams = GenericRequestParams &
  ExtraRequestParam;

export interface DocumentRecentResult {
  id: number;
  name: string;
  description: string;
  file: string;
  file_size: number;
  file_size_display: string;
  document_type: ISelectOption<number>;
  folder: null;
  uploaded_by: number;
  uploaded_by_name: string;
  is_active: boolean;
  is_archived: boolean;
  expiration_date: null;
  created_at: string;
  updated_at: string;
  beneficiary: number;
}
