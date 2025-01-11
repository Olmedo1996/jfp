import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { TutorResult } from '@/modules/tutors/core/interfaces/tutor-service.interface';

export function useColumnsTutors(): ColumnDef<TutorResult>[] {
  return [
    {
      accessorKey: 'full_name',
      header: 'Nombre Completo',
    },
    {
      accessorKey: 'dni',
      header: 'DNI',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'user.email',
      header: 'Email',
    },
    {
      accessorKey: 'specialization',
      header: 'Especialización',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Editar
          </Button>
        </div>
      ),
    },
  ];
}
