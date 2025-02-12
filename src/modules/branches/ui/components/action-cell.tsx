// modules/beneficiaries/ui/components/actions-cell.tsx
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

import { BranchResult } from '../../core/interfaces/branch-service.interface';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@/lib/i18n';
import * as m from '@/paraglide/messages';

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
          <DropdownMenuLabel>{m.actions()}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/branches/edit/${branch.id}`)}
          >
            {m.edit()}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>{m.delete_data()}</DropdownMenuItem> */}
          {/* <DeleteBusinessButton
            id={branch.id}
            fullName={branch.name || ''}
            onOpenChange={setIsDropdownOpen}
          /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
