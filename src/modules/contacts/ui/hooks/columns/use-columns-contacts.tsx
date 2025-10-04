import { ColumnDef } from '@tanstack/react-table';

import { ActionsCell } from '../../components/action-cell';

import { Badge } from '@/components/ui/badge';
import { ContactResult } from '@/modules/contacts/core/interfaces/contact-service.interface';

export function useColumnsContacts(): ColumnDef<ContactResult>[] {
  return [
    {
      accessorKey: 'business_data',
      header: 'Empresa',
    },
    {
      accessorKey: 'branch_data',
      header: 'Sucursal',
    },
    {
      accessorKey: 'first_name',
      header: 'Nombre',
    },
    {
      accessorKey: 'last_name',
      header: 'Apellido',
    },
    {
      accessorKey: 'job_title',
      header: 'Cargo',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'is_primary_contact',
      header: 'Contacto Principal',
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
