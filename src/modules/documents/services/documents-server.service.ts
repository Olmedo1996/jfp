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

import { ISelectOption } from '@/interface/select-option';
import { serverApi } from '@/lib/server-api';

class DocumentsServerSideService {
  async listFoldersServer(
    params?: ApiDocumentsFolderRequestParams
  ): Promise<ApiDocumentsFolderResponse> {
    const response = await serverApi.get<ApiDocumentsFolderResponse>(
      'documents/folders/',
      {
        params,
      }
    );
    return response.data;
  }

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
  }

  async listAllServer(
    params?: ApiDocumentsRequestParams
  ): Promise<ApiDocumentsResponse> {
    const response = await serverApi.get<ApiDocumentsResponse>('documents/', {
      params,
    });
    return response.data;
  }

  async get(id: DocumentResult['id']): Promise<DocumentResult> {
    const response = await serverApi.get<DocumentResult>(
      `documents/${id}/`,
      {}
    );
    return response.data;
  }

  async listDocumentsInFolder(folderId: number): Promise<ApiDocumentsResponse> {
    const response = await serverApi.get<ApiDocumentsResponse>(
      `documents/folders/${folderId}/documents/`
    );
    return response.data;
  }

  async getFolderSelectorById(id: number): Promise<ISelectOption<number>> {
    const response = await serverApi.get<ISelectOption<number>>(
      `documents/folders/selector/${id}/`
    );
    return response.data;
  }
}

export const documentsServerSideService = new DocumentsServerSideService();
