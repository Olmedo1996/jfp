import { useQuery } from '@tanstack/react-query';

import { DocumentRecentResult } from '@/modules/documents/core/interfaces/documents-service.interface';
import { documentsService } from '@/modules/documents/services/documents.service';

interface UseDocumentsListProps {
  beneficiaryId: number;
  initialRecentDocuments?: DocumentRecentResult[];
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
}

export const useDocumentsRecentList = ({
  beneficiaryId,
  initialRecentDocuments,
}: UseDocumentsListProps) => {
  return useQuery({
    queryKey: ['documents-recent', beneficiaryId],
    queryFn: () => {
      const response = documentsService.listRecent({
        beneficiary: beneficiaryId,
      });

      return response;
    },
    initialData: initialRecentDocuments,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
