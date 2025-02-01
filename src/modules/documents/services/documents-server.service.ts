import {
  ApiDocumentsFolderRequestParams,
  ApiDocumentsFolderResponse,
} from '../core/interfaces/documents-folder-service.interface';
import {
  ApiDocumentsRequestParams,
  ApiDocumentsResponse,
  DocumentRecentResult,
  DocumentResult,
} from '../core/interfaces/documents-service.interface';

import { serverApi } from '@/lib/server-api';

export const documentsServerSideService = {
  /*  documents */

  async listRecentServer(
    params?: ApiDocumentsFolderRequestParams
  ): Promise<DocumentRecentResult[]> {
    const response = await serverApi.get<DocumentRecentResult[]>(
      `documents/recent/`,
      {
        params,
      }
    );
    return response.data;
  },

  async listAllServer(
    params?: ApiDocumentsRequestParams
  ): Promise<ApiDocumentsResponse> {
    const response = await serverApi.get<ApiDocumentsResponse>(`documents/`, {
      params,
    });
    return response.data;
  },

  async get(id: DocumentResult['id']): Promise<DocumentResult> {
    const response = await serverApi.get<DocumentResult>(
      `documents/${id}/`,
      {}
    );
    return response.data;
  },

  async listFoldersServer(
    params?: ApiDocumentsFolderRequestParams
  ): Promise<ApiDocumentsFolderResponse> {
    const response = await serverApi.get<ApiDocumentsFolderResponse>(
      `documents/folders/`,
      {
        params,
      }
    );
    return response.data;
  },
};
