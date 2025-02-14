import { useState } from 'react';

import { useDeleteBranch } from '../hooks/form/use-delete-branch';

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

interface DeleteBranchButtonProps {
  id: number;
  fullName: string;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteBranchButton({
  id,
  fullName,
  onOpenChange,
}: DeleteBranchButtonProps) {
  const { mutate, isPending } = useDeleteBranch();
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
          {m.delete_data()}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente a{' '}
            <span className="font-medium">{fullName}</span> y todos sus datos
            asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
