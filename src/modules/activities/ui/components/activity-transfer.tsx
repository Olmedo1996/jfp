'use client';

import { useColumnsTransfers } from '../hooks/columns/use-columns-tranfers';
import { useTransferTable } from '../hooks/table/use-transfer-table';

import { GenericTable } from '@/components/tables/generic-table';

export function TransferTable() {
  const columns = useColumnsTransfers();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    params,
  } = useTransferTable();

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
      title={'Traslados'}
      searchPlaceholder={'Buscar traslado...'}
    />
  );
}
