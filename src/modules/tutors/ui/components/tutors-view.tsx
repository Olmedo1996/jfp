'use client';

import { useColumnsTutors } from '../hooks/columns/use-columns-tutors';
import { useTutorsTable } from '../hooks/table/use-tutors-table';

import { ResponsiveDataView } from '@/components/data-view/responsive-data-view';

export function TutorsView() {
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

  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-4 p-4 md:p-8">
      <ResponsiveDataView
        data={data?.results || []}
        columns={columns}
        isLoading={isLoading}
        error={error}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={params.page}
        pageSize={params.pageSize || 10}
        pageCount={Math.ceil((data?.count || 0) / (params.pageSize || 10))}
        createUrl="/tutors/new"
        title={'Tutores'}
        searchPlaceholder={'Buscar tutores...'}
      />
    </div>
  );
}
