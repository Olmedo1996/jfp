'use client';

import { useColumnsTutors } from '../hooks/columns/use-columns-tutors';
import { useTutorsTable } from '../hooks/table/use-tutors-table';

import { GenericTable } from '@/components/tables/generic-table';

export function TutorsTable() {
  const columns = useColumnsTutors();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
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
      currentPage={params.page}
      pageSize={params.pageSize}
      createUrl="/tutors/new"
      title="Tutores"
    />
  );
}
