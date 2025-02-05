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
import { BranchResult } from '@/modules/branches/core/interfaces/branch-service.interface';
import * as m from '@/paraglide/messages';
export function useColumnsBranches(): ColumnDef<BranchResult>[] {
  const router = useRouter();
  return [
    {
      accessorKey: 'business_data',
      header: m.branches_header_business(),
    },
    {
      accessorKey: 'name',
      header: m.branches_header_name(),
    },
    {
      accessorKey: 'code',
      header: m.branches_header_code(),
    },
    {
      accessorKey: 'address',
      header: m.businesses_address(),
    },
    {
      accessorKey: 'phone',
      header: m.businesses_phone(),
    },
    {
      accessorKey: 'is_active',
      header: m.businesses_is_active,
      cell: ({ row }) => {
        const active = row.original.is_active ? 'activo' : 'inactivo';
        const variant = row.original.is_active ? 'success' : 'destructive';
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
