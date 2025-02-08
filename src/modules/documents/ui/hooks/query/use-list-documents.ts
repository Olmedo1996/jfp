import { useQuery } from '@tanstack/react-query';

import { ApiDocumentsResponse } from '@/modules/documents/core/interfaces/documents-service.interface';
import { documentsService } from '@/modules/documents/services/documents.service';

interface UseDocumentsListProps {
  beneficiaryId: number;
  initialDocuments?: ApiDocumentsResponse;
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
}

export const useDocumentsList = ({
  beneficiaryId,
  initialDocuments,
  page = 1,
  pageSize = 10,
  search = '',
  ordering = '',
}: UseDocumentsListProps) => {
  return useQuery({
    queryKey: ['documents', beneficiaryId, page, pageSize, search, ordering],
    queryFn: async () => {
      const response = await documentsService.list({
        beneficiary: beneficiaryId,
        page,
        pageSize,
        search,
        ordering,
      });

      return response;
    },
    initialData: initialDocuments,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
