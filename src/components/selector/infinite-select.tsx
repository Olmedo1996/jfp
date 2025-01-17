'use client';

import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { IGenericSelector } from '@/types/selectors';

interface InfiniteSelectProps {
  apiEndpoint: string;
  value?: number;
  onSelect?: (value: number) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  className?: string;
}

const fetchItems = async ({ pageParam = 1, search = '', endpoint = '' }) => {
  const searchParam = search ? `&search=${search}` : '';
  const response = await api.get<IGenericSelector>(
    `${endpoint}/?page=${pageParam}${searchParam}`
  );
  return response.data;
};

export function InfiniteSelect({
  apiEndpoint,
  value,
  onSelect,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  noResultsMessage = 'No results found.',
  className,
}: InfiniteSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [apiEndpoint, search],
    queryFn: ({ pageParam }) =>
      fetchItems({
        pageParam,
        search,
        endpoint: apiEndpoint,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextPage = url.searchParams.get('page');
        return nextPage ? parseInt(nextPage) : undefined;
      }
      return undefined;
    },
  });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, refetch]);

  const allItems = data?.pages.flatMap((page) => page.results) || [];

  React.useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {value !== undefined
            ? allItems.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-80 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={setSearch}
          />
          <CommandEmpty>
            {isFetchingNextPage || status === 'pending' ? (
              <div className="text-muted-foreground text-center text-sm">
                Loading more...
              </div>
            ) : (
              noResultsMessage && (
                <div className="text-muted-foreground text-sm">
                  {noResultsMessage}
                </div>
              )
            )}
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              <ScrollArea className="max-h-40">
                {status === 'success' ? (
                  <>
                    {allItems.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value.toString()}
                        onSelect={(currentValue) => {
                          const numValue = parseInt(currentValue);
                          onSelect?.(numValue === value ? 0 : numValue || 0);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 size-4',
                            value === item.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                    <div ref={ref} className="p-1"></div>
                  </>
                ) : status === 'error' ? (
                  <div className="p-2">Error: {error.message}</div>
                ) : (
                  <></>
                )}
              </ScrollArea>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
