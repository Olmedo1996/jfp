'use client';
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { FolderCard } from '@/modules/beneficiaries/ui/components/documents/folder-card';
import { ApiDocumentsFolderResponse } from '@/modules/documents/core/interfaces/documents-folder-service.interface';

interface FoldersContainerProps {
  folders: ApiDocumentsFolderResponse;
}

const FoldersContainer = ({ folders }: FoldersContainerProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Folders</h2>
        <div className=" flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="size-8"
            disabled={current === 0}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="size-8"
            disabled={current === count - 1}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className="w-full"
        setApi={setApi}
      >
        {!(current === 0) && (
          <div className="from-background absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent" />
        )}
        {!(current === count - 1) && (
          <div className="from-background absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent" />
        )}
        <CarouselContent className="-ml-4">
          {folders?.results.map((folder) => {
            const name = folder.name;
            const fileCount = folder.file_count;
            const size = folder.total_size_display;
            const color = folder.color;

            return (
              <CarouselItem
                key={folder.name}
                className={cn(
                  'pl-4',
                  'basis-1/2 md:basis-[250px] lg:basis-[300px]'
                )}
              >
                <FolderCard
                  name={name}
                  fileCount={fileCount}
                  size={size}
                  color={color}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* Ocultamos los botones nativos del Carousel */}
        <div className="hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default FoldersContainer;
