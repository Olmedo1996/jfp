'use client';

import { useColumnsTutors } from '../hooks/columns/use-columns-tutors';
import { useTutorsTable } from '../hooks/table/use-tutors-table';

import { GenericTable } from '@/components/tables/generic-table';
import * as m from '@/paraglide/messages';

export function TutorsTable() {
  const columns = useColumnsTutors();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleOrderingChange,
    params,
  } = useTutorsTable();

  return (
    <GenericTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      error={error}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onOrderingChange={handleOrderingChange}
      currentPage={params.page}
      pageSize={params.pageSize}
      createUrl="/tutors/new"
      title={m.tutors_title()}
      searchPlaceholder={m.tutors_search_placeholder()}
    />
  );
}
