import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import TruncatedCell from '@/components/tables/truncated-cell';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@/lib/i18n';
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';
import * as m from '@/paraglide/messages';

export function useColumnsBeneficiaries(): ColumnDef<BeneficiaryResult>[] {
  const router = useRouter();
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
      cell: ({ row }) => {
        const tutor = row.original;

        return (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{m.actions()}</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => router.push(`/beneficiaries/edit/${tutor.id}`)}
                >
                  {m.edit()}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(tutor))
                  }
                >
                  {m.tutors_copy_data()}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{m.tutors_view_detail()}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{m.delete_data()}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
