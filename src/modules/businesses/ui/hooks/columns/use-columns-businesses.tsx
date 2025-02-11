import { ColumnDef } from '@tanstack/react-table';

import { ActionsCell } from '../../components/action-cell';

import { BusinessResult } from '@/modules/businesses/core/interfaces/business-service.interface';
import * as m from '@/paraglide/messages';

export function useColumnsBusinesses(): ColumnDef<BusinessResult>[] {
  return [
    {
      accessorKey: 'name',
      header: m.businesses_table_name(),
    },
    {
      accessorKey: 'ruc_ci',
      header: m.businesses_table_ruc_ci(),
    },
    {
      accessorKey: 'description',
      header: m.businesses_description(),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionsCell business={row.original} />,
    },
  ];
}
