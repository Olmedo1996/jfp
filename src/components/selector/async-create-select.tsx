'use client';

import React, { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import {
  ApiGenericSelectorResponse,
  SelectOption,
  selectorsService,
} from '@/services/selectors.service';

interface AsyncCreateSelectProps {
  apiEndpoint: string;
  createEndpoint: string;
  value?: SelectOption | null;
  onChange?: (value: SelectOption | null) => void;
  placeholder?: string;
  noOptionsMessage?: string;
  className?: string;
  pageSize?: number;
  ordering?: string;
  createLabel?: string;
}

interface CreateFolderData {
  name: string;
}

export function AsyncCreateSelect({
  apiEndpoint,
  createEndpoint,
  value,
  onChange,
  placeholder = 'Select an option...',
  noOptionsMessage = 'No options available',
  className,
  pageSize = 10,
  ordering,
  createLabel = 'Create new...',
}: AsyncCreateSelectProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['select-options', apiEndpoint],
      queryFn: ({ pageParam = 1 }) =>
        selectorsService.listView({
          endpoint: apiEndpoint,
          page: pageParam,
          pageSize,
          ordering,
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
      enabled: menuIsOpen,
    });

  // Mutación para crear un nuevo elemento
  const createMutation = useMutation({
    mutationFn: (name: string) =>
      selectorsService.createItem<CreateFolderData>({
        endpoint: createEndpoint,
        data: { name } as CreateFolderData,
      }),
    onSuccess: (newItem) => {
      // Actualiza la caché de react-query con el nuevo elemento
      queryClient.setQueryData(
        ['select-options', apiEndpoint],
        (oldData: InfiniteData<ApiGenericSelectorResponse, unknown>) => {
          return {
            ...oldData,
            pages: [
              { results: [newItem], next: null, previous: null, count: 1 },
              ...oldData.pages,
            ],
          };
        }
      );
      // Selecciona automáticamente el nuevo elemento
      onChange?.(newItem);
      setMenuIsOpen(false);
    },
  });

  // Cargar opciones iniciales o basadas en la búsqueda
  const loadOptions = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    selectorsService
      .listView({
        endpoint: apiEndpoint,
        search: inputValue,
        page: 1,
        pageSize,
        ordering,
      })
      .then((response) => {
        callback(response.results);
      })
      .catch((error) => {
        console.error('Error loading options:', error);
        callback([]);
      });
  };

  // Manejar el scroll infinito
  const handleMenuScrollToBottom = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Obtener todas las opciones cargadas
  const options = data?.pages.flatMap((page) => page.results) || [];

  return (
    <AsyncCreatableSelect
      value={value}
      onChange={onChange}
      onCreateOption={(inputValue) => {
        // Crear un nuevo elemento cuando el usuario escribe una opción que no existe
        createMutation.mutate(inputValue);
      }}
      loadOptions={loadOptions}
      defaultOptions={options}
      placeholder={placeholder}
      noOptionsMessage={() => noOptionsMessage}
      onMenuScrollToBottom={handleMenuScrollToBottom}
      isLoading={
        status === 'pending' || isFetchingNextPage || createMutation.isPending
      }
      isSearchable
      isClearable
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
      maxMenuHeight={200}
      formatCreateLabel={(inputValue) => `${createLabel} "${inputValue}"`}
      className={cn('w-full text-sm', className)}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: '40px',
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--input))',
          borderRadius: 'calc(var(--radius) - 2px)',
          boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring))' : 'none',
          '&:hover': {
            borderColor: 'hsl(var(--ring))',
          },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: 'hsl(var(--popover))',
          border: '1px solid hsl(var(--border))',
          borderRadius: 'var(--radius)',
          boxShadow: '0px 4px 16px hsl(var(--border) / 0.2)',
          overflow: 'hidden',
          zIndex: 50,
        }),
        menuList: (base) => ({
          ...base,
          padding: '4px',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'hsl(var(--muted-foreground) / 0.3)',
            borderRadius: '9999px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'hsl(var(--muted-foreground) / 0.5)',
          },
          '&::-webkit-scrollbar-corner': {
            background: 'transparent',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--muted-foreground) / 0.3) transparent',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? 'hsl(var(--primary))'
            : state.isFocused
              ? 'hsl(var(--accent))'
              : 'transparent',
          color: state.isSelected
            ? 'hsl(var(--primary-foreground))'
            : 'hsl(var(--popover-foreground))',
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: 'calc(var(--radius) - 2px)',
          fontSize: '14px',
          transition: 'background-color 150ms ease',
          '&:hover': {
            backgroundColor: state.isSelected
              ? 'hsl(var(--primary))'
              : 'hsl(var(--accent))',
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: 'hsl(var(--foreground))',
        }),
        input: (base) => ({
          ...base,
          color: 'hsl(var(--foreground))',
        }),
        placeholder: (base) => ({
          ...base,
          color: 'hsl(var(--muted-foreground))',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: 'hsl(var(--muted-foreground))',
          padding: '0 8px',
          '&:hover': {
            color: 'hsl(var(--foreground))',
          },
        }),
        clearIndicator: (base) => ({
          ...base,
          color: 'hsl(var(--muted-foreground))',
          padding: '0 8px',
          '&:hover': {
            color: 'hsl(var(--foreground))',
          },
        }),
        loadingIndicator: (base) => ({
          ...base,
          color: 'hsl(var(--muted-foreground))',
          padding: '0 8px',
        }),
      }}
    />
  );
}
