import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { ActionsCell } from '../../components/actions-cell';

import TruncatedCell from '@/components/tables/truncated-cell';
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';

export function useColumnsBeneficiaries(): ColumnDef<BeneficiaryResult>[] {
  // const router = useRouter();
  return [
    {
      accessorKey: 'full_name',
      size: 200,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {'Nombre'}
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'children_count',
      size: 50,
      header: 'Num. hijos',
    },
    {
      accessorKey: 'birth_date',
      header: 'Fecha de Nacimiento',
      cell: ({ row }) => {
        const beneficiary = row.original;

        return <>{beneficiary.birth_date}</>;
      },
    },
    {
      accessorKey: 'notes',
      size: 100,
      header: 'Notas',
      cell: ({ row }) => <TruncatedCell content={row.original.notes} />,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionsCell beneficiary={row.original} />,
    },
  ];
}
