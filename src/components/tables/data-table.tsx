import { useCallback, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import DataTableSkeletonLoading from './data-table-skeleton-loading';
import { CustomPagination } from './pagination';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import * as m from '@/paraglide/messages';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onOrderingChange?: (ordering: string) => void;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount = 1,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  onOrderingChange,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [lastOrdering, setLastOrdering] = useState<string>('');

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updatedSorting) => {
      const newSorting =
        typeof updatedSorting === 'function'
          ? updatedSorting(sorting)
          : updatedSorting;

      setSorting(newSorting);

      if (newSorting.length > 0) {
        console.log(newSorting[0]);
        const column = newSorting[0];
        const newOrderingValue = column.desc ? `-${column.id}` : column.id;
        console.log({ newOrderingValue, lastOrdering });
        if (newOrderingValue !== lastOrdering) {
          setLastOrdering(newOrderingValue);
          onOrderingChange?.(newOrderingValue);
        }
      } else if (lastOrdering !== '') {
        setLastOrdering('');
        onOrderingChange?.('');
      }
    },
    [onOrderingChange, lastOrdering, sorting]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    onSortingChange: handleSortingChange,
    manualSorting: true,
    pageCount: pageCount,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      sorting,
    },
    enableSortingRemoval: true,
    sortDescFirst: false,
  });

  if (isLoading) {
    return (
      <DataTableSkeletonLoading<TData>
        table={table}
        columnsLength={columns.length}
        rowsToShow={5}
      />
    );
  }

  return (
    <div className="flex flex-col rounded-md border">
      <div className="flex flex-col space-y-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        {/* Selector de tamaño de página y texto informativo */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => onPageSizeChange?.(Number(value))}
            >
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size} {m.table_per_page()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="text-sm text-gray-500">
            {m.table_page()} {currentPage} {m.table_of()} {pageCount}
          </span>
        </div>

        {/* Paginación */}
        <div className="flex justify-center sm:justify-end">
          {onPageChange && (
            <CustomPagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={pageCount * pageSize}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="relative grid size-full h-[calc(100vh-16rem)] grid-cols-1 overflow-auto">
          <Table>
            <TableHeader className="bg-secondary sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {m.table_not_found()}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
