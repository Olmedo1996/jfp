// modules/beneficiaries/ui/components/actions-cell.tsx
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

import { ContactResult } from '../../core/interfaces/contact-service.interface';
import { DeleteContactButton } from './delete-branch-button';

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
  contact: ContactResult;
}

export function ActionsCell({ contact }: ActionsCellProps) {
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
            onClick={() => router.push(`/contacts/edit/${contact.id}`)}
          >
            {m.edit()}
          </DropdownMenuItem>
          <DeleteContactButton
            id={contact.id}
            fullName={contact.first_name || contact.last_name}
            onOpenChange={setIsDropdownOpen}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
