import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaginatedResponse } from '@/types/table.types';

interface GenericTableProps<TData> {
  data?: PaginatedResponse<TData>;
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  error: Error | null;
  onSearch?: (value: string) => void;
  createUrl?: string;
  title: string;
}

export function GenericTable<TData>({
  data,
  columns,
  isLoading,
  error,
  onSearch,
  createUrl,
  title,
}: GenericTableProps<TData>) {
  const router = useRouter();

  if (isLoading)
    return <div className="flex justify-center p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex gap-4">
          {onSearch && (
            <Input
              placeholder="Buscar..."
              onChange={(e) => onSearch(e.target.value)}
              className="max-w-xs"
            />
          )}
          {createUrl && (
            <Button onClick={() => router.push(createUrl)}>Crear Nuevo</Button>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.results || []}
        // Aquí puedes agregar más props para paginación si tu DataTable los soporta
      />
    </div>
  );
}
