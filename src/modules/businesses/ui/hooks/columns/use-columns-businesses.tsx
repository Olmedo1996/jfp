import { ColumnDef } from '@tanstack/react-table';

import { ActionsCell } from '../../components/action-cell';

import { BusinessResult } from '@/modules/businesses/core/interfaces/business-service.interface';

export function useColumnsBusinesses(): ColumnDef<BusinessResult>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'ruc_ci',
      header: 'RUC/CI',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionsCell business={row.original} />,
    },
  ];
}
