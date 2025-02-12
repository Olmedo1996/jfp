import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

import { FolderColorSelector } from '@/components/folder-color-selector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MenuFolderOption({
  folderId,
  initialColor,
  onRename,
  isEditing,
}: {
  folderId: number;
  initialColor: string;
  onRename: () => void;
  isEditing: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute right-2 top-2 z-10">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          className="hover:bg-accent flex size-8 items-center justify-center rounded-md"
          disabled={isEditing}
        >
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onRename}>Renombrar</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Colores</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <FolderColorSelector
                  folderId={folderId}
                  initialColor={initialColor}
                />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="text-destructive">
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
