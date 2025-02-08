import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import TruncatedCell from '@/components/tables/truncated-cell';
import { Badge } from '@/components/ui/badge';
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
import { formatDate, parseBackendDate } from '@/utils/dateUtils';
export function useColumnsActivities(): ColumnDef<ActivityResult>[] {
  const router = useRouter();
  return [
    {
      accessorKey: 'beneficiary',
      header: m.activities_header_beneficiary(),
      cell: ({ row }) => {
        const activity = row.original;
        return <TruncatedCell content={activity.beneficiary_data} />;
      },
    },
    {
      accessorKey: 'business',
      header: m.activities_header_business(),
    },
    {
      accessorKey: 'tutor',
      header: m.activities_header_tutor(),
      cell: ({ row }) => {
        const activity = row.original;
        return <TruncatedCell content={activity.tutor_full_name} />;
      },
    },
    {
      accessorKey: 'start_date',
      header: m.activities_header_start_date(),
      cell: ({ row }) => {
        const activity = row.original;
        const startDate = parseBackendDate(activity.start_date || '');
        const humanDate =
          startDate != null ? formatDate(startDate, 'TEXT_ES_LONG') : '';
        return <div>{humanDate}</div>;
      },
    },
    {
      accessorKey: 'end_date',
      header: m.activities_header_end_date(),
      cell: ({ row }) => {
        const activity = row.original;
        const endDate = parseBackendDate(activity.end_date || '');
        const humanDate =
          endDate != null ? formatDate(endDate, 'TEXT_ES_LONG') : '';
        return <div>{humanDate}</div>;
      },
    },
    {
      accessorKey: 'activity_status',
      header: m.activities_header_activity_status,
      cell: ({ row }) => {
        const active = row.original.activity_status ? 'activo' : 'inactivo';
        const variant = row.original.activity_status
          ? 'success'
          : 'destructive';
        return <Badge variant={variant}>{active}</Badge>;
      },
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
