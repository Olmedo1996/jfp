'use client';

import { EBranchRoute } from '../../constants';
import { useColumnsBranches } from '../hooks/columns/use-columns-branches';
import { useBranchTable } from '../hooks/table/use-branch-table';

import { GenericTable } from '@/components/tables/generic-table';

export function BranchTable() {
  const columns = useColumnsBranches();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    params,
  } = useBranchTable();

  return (
    <GenericTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      error={error}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      currentPage={params.page}
      pageSize={params.pageSize}
      createUrl={EBranchRoute.new}
      title={'Sucursales'}
      searchPlaceholder={'Buscar sucursales...'}
    />
  );
}
