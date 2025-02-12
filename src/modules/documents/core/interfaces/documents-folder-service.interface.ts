import { GenericRequestParams } from '@/interface/request-api-params';
import { IResponseApiListViewGet } from '@/interface/response-api-get';

export interface DocumentFolderResult {
  id: number;
  name: string;
  description: string;
  color: string;
  file_count: number;
  total_size: number;
  total_size_display: string;
  created_at: Date;
  beneficiary: number;
  created_by: number;
}

interface ExtraRequestParam {
  beneficiary: number;
}

export type ApiDocumentsFolderResponse =
  IResponseApiListViewGet<DocumentFolderResult>;

export type ApiDocumentsFolderRequestParams = GenericRequestParams &
  ExtraRequestParam;

export type UpdatePartialDocumentFolder = {
  name?: string;
  description?: string;
  color?: string;
};
