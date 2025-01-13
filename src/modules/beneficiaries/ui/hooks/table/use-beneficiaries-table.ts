import { useGenericTable } from '@/hooks/use-generic-table';
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';
import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';

export function useBeneficiariesTable() {
  return useGenericTable<BeneficiaryResult>({
    queryKey: ['beneficiaries'],
    fetchData: beneficiariesService.listView,
  });
}
