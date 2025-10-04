'use client';

import { EContactRoute } from '../../constants';
import { useColumnsContacts } from '../hooks/columns/use-columns-contacts';
import { useContactTable } from '../hooks/table/use-contact-table';

import { GenericTable } from '@/components/tables/generic-table';

export function ContactTable() {
  const columns = useColumnsContacts();
  const {
    data,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    params,
  } = useContactTable();

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
      createUrl={EContactRoute.new}
      title={'Contactos'}
      searchPlaceholder={'Buscar contactos...'}
    />
  );
}
