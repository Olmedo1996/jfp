import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

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
import { ContactResult } from '@/modules/contacts/core/interfaces/contact-service.interface';
import * as m from '@/paraglide/messages';
export function useColumnsContacts(): ColumnDef<ContactResult>[] {
  const router = useRouter();
  return [
    {
      accessorKey: 'branch',
      header: m.contacts_header_branch(),
    },
    {
      accessorKey: 'first_name',
      header: m.contacts_header_first_name(),
    },
    {
      accessorKey: 'last_name',
      header: m.contacts_header_last_name(),
    },
    {
      accessorKey: 'job_title',
      header: m.contacts_header_job_title(),
    },
    {
      accessorKey: 'email',
      header: m.contacts_header_email(),
    },
    {
      accessorKey: 'phone',
      header: m.businesses_phone(),
    },
    {
      accessorKey: 'is_primary_contact',
      header: m.contacts_header_primary_contact,
      cell: ({ row }) => {
        const active = row.original.is_primary_contact ? 'activo' : 'inactivo';
        const variant = row.original.is_primary_contact
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
                  onClick={() => router.push(`/branches/edit/${tutor.id}`)}
                >
                  {m.edit()}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(tutor))
                  }
                >
                  {m.businesses_copy_data()}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {m.businesses_view_detail()}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {m.businesses_view_beneficiary_assignment()}
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
