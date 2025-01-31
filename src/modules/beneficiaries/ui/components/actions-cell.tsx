// modules/beneficiaries/ui/components/actions-cell.tsx
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

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
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';
import { DeleteBeneficiaryButton } from '@/modules/beneficiaries/ui/components/delete-beneficiary-button';
import * as m from '@/paraglide/messages';

interface ActionsCellProps {
  beneficiary: BeneficiaryResult;
}

export function ActionsCell({ beneficiary }: ActionsCellProps) {
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
            onClick={() => router.push(`/beneficiaries/edit/${beneficiary.id}`)}
          >
            {m.edit()}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(beneficiary))
            }
          >
            {`Copiar datos del beneficiario`}
          </DropdownMenuItem>
          {/* Beneficiary family */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              router.push(`/beneficiaries/${beneficiary.id}/family`)
            }
          >{`Familiares`}</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/beneficiaries/${beneficiary.id}/documents`)
            }
          >{`Documentos`}</DropdownMenuItem>
          <DropdownMenuItem>{m.tutors_view_detail()}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DeleteBeneficiaryButton
            id={beneficiary.id}
            fullName={beneficiary.full_name || ''}
            onOpenChange={setIsDropdownOpen}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
