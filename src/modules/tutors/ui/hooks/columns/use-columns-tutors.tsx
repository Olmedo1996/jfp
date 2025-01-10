'use client';

import { ColumnDef } from '@tanstack/react-table';

export interface Tutor {
  id: number;
  full_name: string;
  specialization: string;
  phone: string;
  is_active: boolean;
}

export const useColumnsTutors = (): ColumnDef<Tutor>[] => [
  {
    accessorKey: 'full_name',
    header: 'Full Name',
  },
  {
    accessorKey: 'specialization',
    header: 'Specialization',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'is_active',
    header: 'Active',
    cell: ({ row }) => (row.original.is_active ? 'Yes' : 'No'),
  },
];
