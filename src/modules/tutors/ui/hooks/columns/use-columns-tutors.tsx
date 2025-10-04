import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ETutorsRoute } from '@/modules/tutors/constants';
import { TutorResult } from '@/modules/tutors/core/interfaces/tutor-service.interface';

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
            {'Nombre y Apellido'}
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
            {'DNI/CI'}
            <ArrowUpDown />
          </Button>
        );
      },
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
                <DropdownMenuLabel>{'Acciones'}</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`${ETutorsRoute.edit}/${tutor.id}`)
                  }
                >
                  {'Editar'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(tutor))
                  }
                >
                  {'Copiar datos del tutor'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{'Ver detalles del tutor'}</DropdownMenuItem>
                <DropdownMenuItem>
                  {'Ver beneficiarios asignados'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{'Eliminar'}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
