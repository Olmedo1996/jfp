import { useState } from 'react';

import { useRejectTransfer } from '../hooks/form/use-reject-transfer';

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

interface RejectTransferButtonProps {
  id: number;
  fullName: string;
  onOpenChange?: (open: boolean) => void;
}

export function RejectTransferButton({
  id,
  fullName,
  onOpenChange,
}: RejectTransferButtonProps) {
  const { mutate, isPending } = useRejectTransfer();
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
          {m.transfer_reject()}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de rechazar el traslado de{' '}
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
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? 'Rechazando...' : 'Rechazar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
