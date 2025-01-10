'use client';

import { useColumnsTutors } from '../hooks/columns/use-columns-tutors';
import { useTutorsTable } from '../hooks/table/use-tutors-table';

import { GenericTable } from '@/components/tables/generic-table';

const TutorsTable = () => {
  const columns = useColumnsTutors();
  const { data, isLoading, error, handleSearch } = useTutorsTable();

  return (
    <GenericTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      error={error}
      onSearch={handleSearch}
      createUrl="/tutors/new"
      title="Tutores"
    />
  );
};

export default TutorsTable;
