'use client';

import { EActivityRoute } from '../../constants';
import { useColumnsActivities } from '../hooks/columns/use-columns-activities';
import { useActivityTable } from '../hooks/table/use-activity-table';

import { GenericTable } from '@/components/tables/generic-table';
import * as m from '@/paraglide/messages';

export function ActivityTable() {
  const columns = useColumnsActivities();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    params,
  } = useActivityTable();

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
      createUrl={EActivityRoute.new}
      title={m.activities()}
      searchPlaceholder={m.activities_search_placeholder()}
    />
  );
}
