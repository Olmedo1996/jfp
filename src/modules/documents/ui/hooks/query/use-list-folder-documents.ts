import { useQuery } from '@tanstack/react-query';

import { ApiDocumentsFolderResponse } from '@/modules/documents/core/interfaces/documents-folder-service.interface';
import { documentsService } from '@/modules/documents/services/documents.service';

interface UseDocumentsListProps {
  beneficiaryId: number;
  initialFolderDocuments?: ApiDocumentsFolderResponse;
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
}

export const useDocumentsFolderList = ({
  beneficiaryId,
  initialFolderDocuments,
}: UseDocumentsListProps) => {
  return useQuery({
    queryKey: ['folders', beneficiaryId],
    queryFn: () => {
      const response = documentsService.listFolders({
        beneficiary: beneficiaryId,
      });

      return response;
    },
    initialData: initialFolderDocuments,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
