import { useGenericTable } from '@/hooks/use-generic-table';
import { getBeneficiariesAction } from '@/modules/beneficiaries/actions/beneficiaries.actions';
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';

export function useBeneficiariesTable() {
  return useGenericTable<BeneficiaryResult>({
    queryKey: ['beneficiaries'],
    fetchData: getBeneficiariesAction,
  });
}
