import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

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
import { ActivityResult } from '@/modules/activities/core/interfaces/activity-service.interface';
import * as m from '@/paraglide/messages';
export function useColumnsActivities(): ColumnDef<ActivityResult>[] {
  const router = useRouter();
  return [
    {
      accessorKey: 'beneficiary',
      header: m.activities_header_beneficiary(),
    },
    {
      accessorKey: 'business',
      header: m.activities_header_business(),
    },
    {
      accessorKey: 'tutor',
      header: m.activities_header_tutor(),
    },
    {
      accessorKey: 'start_date',
      header: m.activities_header_start_date(),
    },
    {
      accessorKey: 'end_date',
      header: m.activities_header_end_date(),
    },
    {
      accessorKey: 'activity_status',
      header: m.activities_header_activity_status,
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
                  onClick={() => router.push(`/activities/edit/${tutor.id}`)}
                >
                  {m.edit()}
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
