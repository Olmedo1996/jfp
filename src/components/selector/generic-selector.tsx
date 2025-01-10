import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { ScrollArea } from '../ui/scroll-area';

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
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { IGenericSelector } from '@/types/selectors';

// Interfaces para la estructura de datos
interface Option {
  value: number | string;
  label: string;
}

interface GenericComboboxProps {
  endpoint: string;
  placeholder?: string;
  value?: number | string;
  onChange: (value: number | string) => void;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  className?: string;
}

const GenericSelector: React.FC<GenericComboboxProps> = ({
  endpoint,
  placeholder = 'Selecciona una opción...',
  value,
  onChange,
  searchPlaceholder = 'Buscar...',
  noResultsMessage = 'No se encontraron resultados.',
  className,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const baseUrl = 'http://localhost:8000/api/v1/';
  // Función para cargar datos
  const fetchData = useCallback(
    async (
      searchTerm: string = '',
      pageNum: number = 1,
      append: boolean = false
    ): Promise<void> => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          search: searchTerm,
          page: pageNum.toString(),
        });

        const response = await api.get<IGenericSelector>(
          `${baseUrl}${endpoint}/?${params}`
        );
        const data = response.data;

        setHasMore(!!data.next);

        if (append) {
          setItems((prev) => [...prev, ...data.results]);
        } else {
          setItems(data.results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  // Observador para scroll infinito
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });

    const currentElement = lastItemRef.current;
    if (currentElement) {
      observer.current.observe(currentElement);
    }
    console.log(currentElement);
    return () => {
      if (currentElement && observer.current) {
        observer.current.unobserve(currentElement);
      }
    };
  }, [hasMore, loading, lastItemRef]);

  // Cargar datos cuando cambia la página
  useEffect(() => {
    if (page > 1) {
      fetchData(search, page, true);
    }
  }, [page, search, endpoint, fetchData]);

  // Manejar búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchData(search, 1, false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, endpoint, fetchData]);

  // Cargar datos iniciales
  useEffect(() => {
    fetchData('', 1, false);
  }, [endpoint, fetchData]);

  const handleSelect = (currentValue: string): void => {
    const selectedItem = items.find((item) => item.label === currentValue);
    if (selectedItem) {
      onChange(selectedItem.value);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>{noResultsMessage}</CommandEmpty>
          <CommandGroup>
            <ScrollArea
              className="h-[100px] overflow-auto"
              // onScroll={handleScroll}
            >
              <CommandList>
                {items.map((item, index) => (
                  <CommandItem
                    key={item.value}
                    ref={index === items.length - 1 ? lastItemRef : null}
                    value={item.label}
                    onSelect={() => handleSelect(item.label)}
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
                {loading && <CommandItem>Cargando más opciones...</CommandItem>}
              </CommandList>
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default GenericSelector;
