import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

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
import { TutorResult } from '@/modules/tutors/core/interfaces/tutor-service.interface';
import * as m from '@/paraglide/messages';
export function useColumnsTutors(): ColumnDef<TutorResult>[] {
  const router = useRouter();
  return [
    {
      accessorKey: 'full_name',
      size: 200,
      // header: m.tutors_full_name(),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {m.tutors_full_name()}
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      accessorKey: 'dni',
      // header: m.tutors_dni(),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {m.tutors_dni()}
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: m.tutors_phone(),
    },
    {
      accessorKey: 'user.email',
      header: m.tutors_table_email(),
    },
    {
      accessorKey: 'specialization',
      header: m.tutors_specialization(),
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
                <DropdownMenuLabel>
                  {m.tutors_table_actions()}
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => router.push(`/tutors/edit/${tutor.id}`)}
                >
                  {m.tutors_table_edit()}
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
                <DropdownMenuItem>
                  {m.tutors_view_beneficiary_assignment()}
                </DropdownMenuItem>
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
