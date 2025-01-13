import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const TruncatedCell = ({ content }: { content: string }) => {
  if (!content) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="line-clamp-2 max-w-24">{content}</div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] whitespace-pre-wrap break-words">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedCell;
