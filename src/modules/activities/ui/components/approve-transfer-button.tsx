import { useState } from 'react';

import { useApproveTransfer } from '../hooks/form/use-approve-transfer';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import * as m from '@/paraglide/messages';

interface ApproveTransferButtonProps {
  id: number;
  fullName: string;
  onOpenChange?: (open: boolean) => void;
}

export function ApproveTransferButton({
  id,
  fullName,
  onOpenChange,
}: ApproveTransferButtonProps) {
  const { mutate, isPending } = useApproveTransfer();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = () => {
    mutate(id);
    setIsAlertOpen(false);
    onOpenChange?.(false); // Cerrar el dropdown después de la mutación
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setIsAlertOpen(true);
          }}
        >
          {m.transfer_approve()}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de aprobar el traslado de{' '}
            <span className="font-medium">{fullName}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300"
          >
            {isPending ? 'Aprobando...' : 'Aprobar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
