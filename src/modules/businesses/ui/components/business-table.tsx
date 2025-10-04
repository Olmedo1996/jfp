'use client';

import { EBusinessRoute } from '../../constants';
import { useColumnsBusinesses } from '../hooks/columns/use-columns-businesses';
import { useBusinessTable } from '../hooks/table/use-business-table';

import { GenericTable } from '@/components/tables/generic-table';

export function BusinessTable() {
  const columns = useColumnsBusinesses();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    params,
  } = useBusinessTable();

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
      createUrl={EBusinessRoute.new}
      title={'Comercios'}
      searchPlaceholder={'Buscar comercios...'}
    />
  );
}
