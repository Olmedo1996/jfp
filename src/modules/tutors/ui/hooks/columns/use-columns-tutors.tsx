import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/lib/i18n';
import { TutorResult } from '@/modules/tutors/core/interfaces/tutor-service.interface';
import * as m from '@/paraglide/messages';

export function useColumnsTutors(): ColumnDef<TutorResult>[] {
  const router = useRouter();
  return [
    {
      accessorKey: 'full_name',
      header: m.tutors_full_name(),
    },
    {
      accessorKey: 'dni',
      header: m.tutors_dni(),
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
      header: m.tutors_table_actions(),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/tutors/edit/${row.original.id}`)}
          >
            {m.tutors_table_edit()}
          </Button>
        </div>
      ),
    },
  ];
}
