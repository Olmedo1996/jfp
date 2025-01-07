'use client';

import React from 'react';

import { Tutor, useColumnsTutors } from '../hooks/use-columns-tutors';

import { DataTable } from '@/components/tables/data-table';

const TutorsTable = () => {
  const columns = useColumnsTutors();

  const data: Tutor[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TutorsTable;
