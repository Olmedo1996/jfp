import { useGenericTable } from '@/hooks/use-generic-table';
import { BranchResult } from '@/modules/branches/core/interfaces/branch-service.interface';
import { branchService } from '@/modules/branches/services/branch.service';

export function useBranchTable() {
  return useGenericTable<BranchResult>({
    queryKey: ['branches'],
    fetchData: branchService.listView,
  });
}
