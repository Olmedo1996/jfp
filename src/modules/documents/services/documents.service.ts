import {
  ApiDocumentsFolderRequestParams,
  ApiDocumentsFolderResponse,
} from '../core/interfaces/documents-folder-service.interface';
import {
  ApiDocumentsRequestParams,
  ApiDocumentsResponse,
} from '../core/interfaces/documents-service.interface';

import { api } from '@/lib/api';

export const documentsService = {
  /*  documents */

  async list(
    params?: ApiDocumentsRequestParams
  ): Promise<ApiDocumentsResponse> {
    const response = await api.get<ApiDocumentsResponse>(`documents/`, {
      params,
    });
    return response.data;
  },

  /*  documents folders*/

  async listFolders(
    params?: ApiDocumentsFolderRequestParams
  ): Promise<ApiDocumentsFolderResponse> {
    const response = await api.get<ApiDocumentsFolderResponse>(
      `documents/folders/`,
      {
        params,
      }
    );
    return response.data;
  },
};
