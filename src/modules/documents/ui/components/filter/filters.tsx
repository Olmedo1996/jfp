import React from 'react';
import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Filters = () => {
  return (
    <>
      <Button variant="outline" size="sm" className="flex-none">
        <Filter className="mr-2 size-4" />
        Filters
      </Button>

      <Select defaultValue="latest">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Sort By: Latest</SelectItem>
          <SelectItem value="oldest">Sort By: Oldest</SelectItem>
          <SelectItem value="name" className="">
            Sort By: Name
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default Filters;
