'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/lib/i18n';
import * as m from '@/paraglide/messages';
import { PaginatedResponse } from '@/types/table.types';

interface GenericTableProps<TData> {
  data?: PaginatedResponse<TData>;
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  error: Error | null;
  onSearch?: (value: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onOrderingChange?: (ordering: string) => void;
  currentPage?: number;
  pageSize?: number;
  createUrl?: string;
  title: string;
  searchPlaceholder?: string;
}

export function GenericTable<TData>({
  data,
  columns,
  isLoading,
  error,
  onSearch,
  onPageChange,
  onPageSizeChange,
  onOrderingChange,
  currentPage = 1,
  pageSize = 10,
  createUrl,
  title,
  searchPlaceholder = m.table_search(),
}: GenericTableProps<TData>) {
  const router = useRouter();
  const pageCount = data ? Math.ceil(data.count / pageSize) : 0;

  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex gap-4">
          {onSearch && (
            <Input
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
              className="max-w-xs"
            />
          )}
          {createUrl && (
            <Button onClick={() => router.push(createUrl)}>
              {m.table_create_new()}
            </Button>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.results || []}
        pageCount={pageCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onOrderingChange={onOrderingChange}
        isLoading={isLoading}
      />
    </div>
  );
}
