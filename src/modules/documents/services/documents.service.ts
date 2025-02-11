import { ICreateDocument } from '../core/interfaces/documents.interface';
import {
  ApiDocumentsFolderRequestParams,
  ApiDocumentsFolderResponse,
  DocumentFolderResult,
} from '../core/interfaces/documents-folder-service.interface';
import {
  ApiDocumentsRequestParams,
  ApiDocumentsResponse,
  DocumentRecentResult,
  DocumentResult,
} from '../core/interfaces/documents-service.interface';

import { api } from '@/lib/api';

class DocumentsService {
  private createFormData(data: ICreateDocument): FormData {
    const formData = new FormData();

    formData.append('file', data.file);

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'file' && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    return formData;
  }

  async create(data: ICreateDocument): Promise<DocumentResult> {
    try {
      const formData = this.createFormData(data);
      const response = await api.post<DocumentResult>('documents/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  async list(
    params?: ApiDocumentsRequestParams
  ): Promise<ApiDocumentsResponse> {
    const response = await api.get<ApiDocumentsResponse>('documents/', {
      params,
    });
    return response.data;
  }

  async listFolders(
    params?: ApiDocumentsFolderRequestParams
  ): Promise<ApiDocumentsFolderResponse> {
    const response = await api.get<ApiDocumentsFolderResponse>(
      'documents/folders/',
      {
        params,
      }
    );
    return response.data;
  }

  async listRecent(
    params?: ApiDocumentsFolderRequestParams
  ): Promise<DocumentRecentResult[]> {
    const response = await api.get<DocumentRecentResult[]>(
      `documents/recent/`,
      {
        params,
      }
    );
    return response.data;
  }

  async updateFolderColor(
    folderId: number,
    color: string
  ): Promise<DocumentFolderResult> {
    const response = await api.patch<DocumentFolderResult>(
      `documents/folders/${folderId}/`,
      { color }
    );
    return response.data;
  }
}

export const documentsService = new DocumentsService();
