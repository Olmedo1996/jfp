'use client';

import { useState } from 'react';

import { FolderIcon } from './folder-icon';

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
        'min-w-[200px] max-w-[350px]', // Límites de ancho
        'max-h-[180px] min-h-[120px]', // Límites de altura
        'size-full' // Ocupar el espacio disponible dentro de los límites
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent
        className={cn(
          'p-3 sm:p-4 lg:p-6', // Padding responsive
          'flex flex-col gap-2 sm:gap-3 lg:gap-4' // Espaciado interno responsive
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

          {/* Nombre de la carpeta */}
          <h3
            className={cn(
              'truncate font-semibold',
              // 'text-xs sm:text-sm lg:text-base',
              'line-clamp-2 sm:line-clamp-1'
            )}
          >
            {name}
          </h3>

          {/* Información de archivos */}
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
