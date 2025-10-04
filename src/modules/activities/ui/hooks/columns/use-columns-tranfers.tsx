import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { ApproveTransferButton } from '../../components/approve-transfer-button';
import { RejectTransferButton } from '../../components/reject-transfer-button';

import TruncatedCell from '@/components/tables/truncated-cell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActivityResult } from '@/modules/activities/core/interfaces/activity-service.interface';
import { formatDate, parseBackendDate } from '@/utils/dateUtils';

export function useColumnsTransfers(): ColumnDef<ActivityResult>[] {
  // const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return [
    {
      accessorKey: 'beneficiary',
      header: 'Beneficiario',
      cell: ({ row }) => {
        const activity = row.original;
        return <TruncatedCell content={activity.beneficiary_data} />;
      },
    },
    {
      accessorKey: 'business_data',
      header: 'Empresa',
    },
    {
      accessorKey: 'tutor',
      header: 'Tutor',
      cell: ({ row }) => {
        const activity = row.original;
        return <TruncatedCell content={activity.tutor_full_name} />;
      },
    },
    {
      accessorKey: 'start_date',
      header: 'Fecha de inicio',
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
      header: 'Fecha de fin',
      cell: ({ row }) => {
        const activity = row.original;
        const endDate = parseBackendDate(activity.end_date || '');
        const humanDate =
          endDate != null ? formatDate(endDate, 'TEXT_ES_LONG') : '';
        return <div>{humanDate}</div>;
      },
    },
    {
      accessorKey: 'activity_status_data',
      header: 'Estado',
      cell: ({ row }) => {
        // const variant = row.original.activity_status
        //   ? 'success'
        //   : 'destructive';
        return (
          <Badge variant={'success'}>{row.original.activity_status_data}</Badge>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const tutor = row.original;
        console.log(tutor);
        return (
          <div className="flex gap-2">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{'Acciones'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ApproveTransferButton
                  id={row.original.id}
                  fullName={row.original.beneficiary_data || ''}
                  onOpenChange={setIsDropdownOpen}
                />
                <RejectTransferButton
                  id={row.original.id}
                  fullName={row.original.beneficiary_data || ''}
                  onOpenChange={setIsDropdownOpen}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
