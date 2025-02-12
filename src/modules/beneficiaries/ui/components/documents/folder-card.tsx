'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';

import { FolderIcon } from './folder-icon';
import { MenuFolderOption } from './menu-folder-option';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ApiDocumentsFolderResponse } from '@/modules/documents/core/interfaces/documents-folder-service.interface';
import { documentsService } from '@/modules/documents/services/documents.service';

interface FolderCardProps {
  folderId: number;
  name: string;
  fileCount: number;
  size: string;
  color?: string;
}

export function FolderCard({
  folderId,
  name,
  fileCount,
  size,
  color,
}: FolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [folderName, setFolderName] = useState(name);
  const params = useParams();
  const beneficiaryId = Number(params.id);
  const queryClient = useQueryClient();

  const { mutate: updateName } = useMutation({
    mutationFn: (newName: string) =>
      documentsService.updatePartialFolder(folderId, { name: newName }),
    onSuccess: (updatedFolder) => {
      queryClient.setQueryData(
        ['folders', beneficiaryId],
        (oldData: ApiDocumentsFolderResponse) => {
          const newResult = oldData.results.map((folder) =>
            folder.id === folderId
              ? { ...folder, name: updatedFolder.name }
              : folder
          );

          return {
            ...oldData,
            results: newResult,
          };
        }
      );
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateName(folderName);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setFolderName(name);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFolderName(name);
  };

  return (
    <Card
      className={cn(
        'hover:bg-accent/50 cursor-pointer transition-colors',
        'flex flex-col justify-between',
        'min-w-[200px] max-w-[350px]',
        'max-h-[180px] min-h-[120px]',
        'relative size-full'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MenuFolderOption
        folderId={folderId}
        initialColor={color || '#B4D455'}
        onRename={() => setIsEditing(true)}
        isEditing={isEditing}
      />
      <CardContent
        className={cn(
          'p-3 sm:p-4 lg:p-6',
          'flex flex-col gap-2 sm:gap-3 lg:gap-4'
        )}
      >
        <div className="flex flex-col gap-4 sm:gap-2">
          <div
            className={cn(
              'size-10 sm:size-12 lg:size-16',
              'transition-all duration-200'
            )}
          >
            <FolderIcon color={color} isOpen={isHovered} />
          </div>

          {isEditing ? (
            <div className="relative">
              <Input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={handleCancelEdit}
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <h3
              className={cn(
                'truncate font-semibold',
                'line-clamp-2 sm:line-clamp-1'
              )}
            >
              {folderName}
            </h3>
          )}

          <p
            className={cn(
              'text-muted-foreground',
              'text-[10px] sm:text-xs lg:text-sm',
              'mt-auto'
            )}
          >
            {fileCount} Files · {size}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
