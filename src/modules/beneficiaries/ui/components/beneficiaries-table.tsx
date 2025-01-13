'use client';

import { GenericTable } from '@/components/tables/generic-table';
import { useColumnsBeneficiaries } from '@/modules/beneficiaries/ui/hooks/columns/use-columns-beneficiares';
import { useBeneficiariesTable } from '@/modules/beneficiaries/ui/hooks/table/use-beneficiaries-table';
import * as m from '@/paraglide/messages';

const BeneficiariesTable = () => {
  const columns = useColumnsBeneficiaries();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleOrderingChange,
    params,
  } = useBeneficiariesTable();

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
      createUrl="/beneficiaries/new"
      title={m.beneficiaries()}
      searchPlaceholder={m.tutors_search_placeholder()}
    />
  );
};

export default BeneficiariesTable;
