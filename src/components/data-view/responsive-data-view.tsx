'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { DataCards } from '@/components/data-view/data-cards';
import { DataTable } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { DataViewProps } from '@/types/data-view.types';

export function ResponsiveDataView<TData, TValue>({
  onSearch,
  createUrl = '',
  ...props
}: DataViewProps<TData, TValue>) {
  const isMobileFromSidebar = useIsMobile();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);

  useEffect(() => {
    setIsMobile(isMobileFromSidebar);
  }, [isMobileFromSidebar]);

  if (props?.error)
    return (
      <div className="p-4 text-red-500">Error: {props?.error?.message}</div>
    );

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">{props.title || 'Listado'}</h1>
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          {onSearch && (
            <Input
              placeholder="Buscar..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full md:w-64"
            />
          )}
          <Button
            onClick={() => router.push(createUrl || `/${pathSegments[0]}/new`)}
            className="w-full md:w-auto"
          >
            Crear Nuevo
          </Button>
        </div>
      </div>
      {isMobile === null ? (
        <div className="p-4">Cargando...</div>
      ) : isMobile ? (
        <DataCards {...props} />
      ) : (
        <DataTable {...props} />
      )}
    </>
  );
}
