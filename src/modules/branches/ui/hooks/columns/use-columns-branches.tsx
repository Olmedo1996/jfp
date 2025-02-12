import { ColumnDef } from '@tanstack/react-table';

import { ActionsCell } from '../../components/action-cell';

import { Badge } from '@/components/ui/badge';
import { BranchResult } from '@/modules/branches/core/interfaces/branch-service.interface';
import * as m from '@/paraglide/messages';
export function useColumnsBranches(): ColumnDef<BranchResult>[] {
  return [
    {
      accessorKey: 'business_data',
      header: m.branches_header_business(),
    },
    {
      accessorKey: 'name',
      header: m.branches_header_name(),
    },
    {
      accessorKey: 'code',
      header: m.branches_header_code(),
    },
    {
      accessorKey: 'address',
      header: m.businesses_address(),
    },
    {
      accessorKey: 'phone',
      header: m.businesses_phone(),
    },
    {
      accessorKey: 'is_active',
      header: m.businesses_is_active,
      cell: ({ row }) => {
        const active = row.original.is_active ? 'activo' : 'inactivo';
        const variant = row.original.is_active ? 'success' : 'destructive';
        return <Badge variant={variant}>{active}</Badge>;
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionsCell branch={row.original} />,
    },
  ];
}
