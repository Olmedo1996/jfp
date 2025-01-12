import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataViewProps } from '@/types/data-view.types';

export function DataCards<TData, TValue>({
  columns,
  data,
  pageCount = 1,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  isLoading,
}: DataViewProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, idx) => (
          <Card key={idx} className="animate-pulse p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {table.getRowModel().rows.length > 0 &&
        table.getRowModel().rows.map((row, rowIndex) => (
          <Card key={rowIndex} className="relative p-4">
            {table.getHeaderGroups().map((headerGroup) => {
              const { headers } = headerGroup;

              return (
                <div key={headerGroup.id}>
                  {headers.map((header) => {
                    const columnId = header.id;

                    if (
                      columnId === 'actions' &&
                      header.column.columnDef.cell
                    ) {
                      const ActionComponent = header.column.columnDef.cell;
                      const headerContext = row
                        .getVisibleCells()
                        .find((cell) => cell.column.id === columnId);
                      return (
                        <div
                          key={header.id}
                          className="absolute right-4 top-4 flex items-center space-x-2"
                        >
                          {headerContext
                            ? flexRender(
                                ActionComponent,
                                headerContext.getContext()
                              )
                            : null}
                        </div>
                      );
                    }

                    // Renderiza las demás columnas normalmente
                    const cellValue = row.getValue(columnId) as string;
                    return (
                      <div
                        key={header.id}
                        className="border-b py-2 last:border-b-0"
                      >
                        <div className="text-sm font-medium text-gray-500">
                          {header.column.columnDef.header as string}
                        </div>
                        <span className="block text-gray-900">{cellValue}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Card>
        ))}

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <select
            className="rounded border p-1"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size} por página
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Página {currentPage} de {pageCount}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= pageCount}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
