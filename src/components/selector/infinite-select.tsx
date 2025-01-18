'use client';

import * as React from 'react';
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
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useInfiniteList } from '@/hooks/use-infinite-list';
import { ISelectOption } from '@/interface/select-option';
import { cn } from '@/lib/utils';
// import { ISelectOption } from '@/services/selectors.service';

interface InfiniteSelectProps {
  apiEndpoint: string;
  value?: ISelectOption<number> | null;
  onChange?: (value: ISelectOption<number> | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  className?: string;
  pageSize?: number;
  ordering?: string;
}

export function InfiniteSelect({
  apiEndpoint,
  value,
  onChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  noResultsMessage = 'No results found.',
  className,
  pageSize,
  ordering,
}: InfiniteSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const debouncedSearch = useDebouncedValue(searchInput, 500);

  const { items, error, status, ref, isFetchingNextPage } = useInfiniteList({
    endpoint: apiEndpoint,
    search: debouncedSearch,
    pageSize,
    ordering,
  });

  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      const selected = items.find(
        (item) => item.value.toString() === selectedValue
      );
      const newValue =
        selected?.value === value?.value ? null : selected || null;
      onChange?.(newValue);
      setOpen(false);
    },
    [items, value, onChange]
  );

  React.useEffect(() => {
    if (!open) {
      setSearchInput('');
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
          {value?.label || placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-96 p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchInput}
            onValueChange={setSearchInput}
            placeholder={searchPlaceholder}
          />
          <CommandEmpty>
            {isFetchingNextPage || status === 'pending' ? (
              <LoadingMessage loadingMessage="Loading more..." />
            ) : (
              <NoResultsMessage message={noResultsMessage} />
            )}
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              <ScrollArea className="max-h-40">
                {status === 'success' ? (
                  <SelectOptions
                    items={items}
                    selectedValue={value}
                    onSelect={handleSelect}
                    observerRef={ref}
                  />
                ) : status === 'error' ? (
                  <ErrorMessage error={error} />
                ) : null}
              </ScrollArea>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Componentes auxiliares
const LoadingMessage = ({ loadingMessage }: { loadingMessage: string }) => (
  <div className="text-muted-foreground text-center text-sm">
    {loadingMessage}
  </div>
);

const NoResultsMessage = ({ message }: { message: string }) => (
  <div className="text-muted-foreground text-sm">{message}</div>
);

const ErrorMessage = ({ error }: { error: Error }) => (
  <div className="text-destructive p-2">Error: {error.message}</div>
);

interface SelectOptionsProps {
  items: ISelectOption<number>[];
  selectedValue?: ISelectOption<number> | null;
  onSelect: (value: string) => void;
  observerRef: (node?: Element | null) => void;
}

const SelectOptions = ({
  items,
  selectedValue,
  onSelect,
  observerRef,
}: SelectOptionsProps) => (
  <>
    {items.map((item) => (
      <CommandItem
        key={item.value}
        value={item.value.toString()}
        onSelect={onSelect}
      >
        <Check
          className={cn(
            'mr-2 size-4',
            selectedValue?.value === item.value ? 'opacity-100' : 'opacity-0'
          )}
        />
        {item.label}
      </CommandItem>
    ))}
    <div ref={observerRef} className="p-1" />
  </>
);
