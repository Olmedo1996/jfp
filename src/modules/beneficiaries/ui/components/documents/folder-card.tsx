'use client';

import { useState } from 'react';

import { FolderIcon } from './folder-icon';
import { MenuFolderOption } from './menu-folder-option';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FolderCardProps {
  name: string;
  fileCount: number;
  size: string;
  color?: string;
}

export function FolderCard({ name, fileCount, size, color }: FolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        'hover:bg-accent/50 cursor-pointer transition-colors',
        'flex flex-col justify-between',
        'min-w-[200px] max-w-[350px]',
        'max-h-[180px] min-h-[120px]',
        'relative size-full' // Agregado 'relative' para posicionamiento del botón
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dropdown Menu */}
      <MenuFolderOption />
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

          <h3
            className={cn(
              'truncate font-semibold',
              'line-clamp-2 sm:line-clamp-1'
            )}
          >
            {name}
          </h3>

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
