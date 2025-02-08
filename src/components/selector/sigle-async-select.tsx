'use client';

import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useInfiniteQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
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
  isDisabled?: boolean;
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
  isDisabled = false,
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
      enabled: !isDisabled, // Solo habilita la consulta cuando el menú está abierto
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
      defaultOptions={options}
      placeholder={placeholder}
      noOptionsMessage={() => noOptionsMessage}
      onMenuScrollToBottom={handleMenuScrollToBottom}
      isLoading={(status === 'pending' || isFetchingNextPage) && menuIsOpen}
      isSearchable
      isClearable
      cacheOptions
      isDisabled={isDisabled}
      className={cn('w-full text-sm', className)}
      classNamePrefix="react-select"
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
      maxMenuHeight={200}
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
