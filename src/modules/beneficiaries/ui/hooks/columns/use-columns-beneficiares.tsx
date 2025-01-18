import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { ActionsCell } from '../../components/actions-cell';

import TruncatedCell from '@/components/tables/truncated-cell';
import { Button } from '@/components/ui/button';
// import { useRouter } from '@/lib/i18n';
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';
import * as m from '@/paraglide/messages';

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
            {m.beneficiaries_header_full_name()}
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: m.beneficiaries_header_phone(),
    },
    {
      accessorKey: 'email',
      header: m.beneficiaries_header_email(),
    },
    {
      accessorKey: 'children_count',
      size: 50,
      header: m.beneficiaries_header_children_count(),
    },
    {
      accessorKey: 'birth_date',
      header: m.beneficiaries_header_birth_date(),
      cell: ({ row }) => {
        const beneficiary = row.original;

        return <>{beneficiary.birth_date}</>;
      },
    },
    {
      accessorKey: 'notes',
      size: 100,
      header: m.beneficiaries_header_notes(),
      cell: ({ row }) => <TruncatedCell content={row.original.notes} />,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionsCell beneficiary={row.original} />,
    },
  ];
}
