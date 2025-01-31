'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ScrollButtonsProps {
  scrollContainerId: string;
}

export function ScrollButtons({ scrollContainerId }: ScrollButtonsProps) {
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(scrollContainerId);
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll('left')}
        className="size-8"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll('right')}
        className="size-8"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
