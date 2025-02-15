import { ColumnDef } from '@tanstack/react-table';

import { ActionsCell } from '../../components/action-cell';

import { Badge } from '@/components/ui/badge';
import { ContactResult } from '@/modules/contacts/core/interfaces/contact-service.interface';
import * as m from '@/paraglide/messages';
export function useColumnsContacts(): ColumnDef<ContactResult>[] {
  return [
    {
      accessorKey: 'business_data',
      header: m.contacts_header_business(),
    },
    {
      accessorKey: 'branch_data',
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
      cell: ({ row }) => <ActionsCell contact={row.original} />,
    },
  ];
}
