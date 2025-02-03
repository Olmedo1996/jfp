'use client';

import React, { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

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
      className={className}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: '40px',
          backgroundColor: 'white',
          borderRadius: '6px',
        }),
        menu: (base) => ({
          ...base,
          zIndex: 100,
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: '200px',
          overflowY: 'auto',
        }),
      }}
    />
  );
}
