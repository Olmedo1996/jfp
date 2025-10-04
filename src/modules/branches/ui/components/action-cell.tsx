// modules/beneficiaries/ui/components/actions-cell.tsx
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { BranchResult } from '../../core/interfaces/branch-service.interface';
import { DeleteBranchButton } from './delete-branch-button';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionsCellProps {
  branch: BranchResult;
}

export function ActionsCell({ branch }: ActionsCellProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <DropdownMenuItem
            onClick={() => router.push(`/branches/edit/${branch.id}`)}
          >
            {'Editar'}
          </DropdownMenuItem>
          <DeleteBranchButton
            id={branch.id}
            fullName={branch.name || ''}
            onOpenChange={setIsDropdownOpen}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
