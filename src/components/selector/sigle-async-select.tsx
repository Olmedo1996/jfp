'use client';

import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useInfiniteQuery } from '@tanstack/react-query';

import { SelectOption, selectorsService } from '@/services/selectors.service';

interface AsyncInfiniteSelectProps {
  apiEndpoint: string;
  value?: SelectOption | null;
  onChange?: (value: SelectOption | null) => void;
  placeholder?: string;
  noOptionsMessage?: string;
  className?: string;
  pageSize?: number;
  ordering?: string;
}

export function AsyncInfiniteSelect({
  apiEndpoint,
  value,
  onChange,
  placeholder = 'Select an option...',
  noOptionsMessage = 'No options available',
  className,
  pageSize = 10,
  ordering,
}: AsyncInfiniteSelectProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
      // enabled: menuIsOpen, // Solo habilita la consulta cuando el menú está abierto
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
    <AsyncSelect
      value={value}
      onChange={onChange}
      loadOptions={loadOptions}
      defaultOptions={options} // Opciones iniciales
      placeholder={placeholder}
      noOptionsMessage={() => noOptionsMessage}
      onMenuScrollToBottom={handleMenuScrollToBottom}
      isLoading={(status === 'pending' || isFetchingNextPage) && menuIsOpen}
      isSearchable
      isClearable
      cacheOptions
      className={className}
      onMenuOpen={() => setMenuIsOpen(true)} // Abrir menú
      onMenuClose={() => setMenuIsOpen(false)} // Cerrar menú
      maxMenuHeight={200} // Ajustar la altura del menú
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
