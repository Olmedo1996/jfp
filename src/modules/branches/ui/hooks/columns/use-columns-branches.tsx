import { ColumnDef } from '@tanstack/react-table';

import { ActionsCell } from '../../components/action-cell';

import { Badge } from '@/components/ui/badge';
import { BranchResult } from '@/modules/branches/core/interfaces/branch-service.interface';

export function useColumnsBranches(): ColumnDef<BranchResult>[] {
  return [
    {
      accessorKey: 'business_data',
      header: 'Empresa',
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'code',
      header: 'Código',
    },
    {
      accessorKey: 'address',
      header: 'Dirección',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'is_active',
      header: 'Estado',
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
