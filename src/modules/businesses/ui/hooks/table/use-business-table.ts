import { useGenericTable } from '@/hooks/use-generic-table';
import { BusinessResult } from '@/modules/businesses/core/interfaces/business-service.interface';
import { businessService } from '@/modules/businesses/services/business.service';

export function useBusinessTable() {
  return useGenericTable<BusinessResult>({
    queryKey: ['businesses'],
    fetchData: businessService.listView,
  });
}
