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

import { ScrollArea } from '../ui/scroll-area';
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
        rowsToShow={pageSize}
      />
    );
  }

  return (
    <div className="flex flex-col rounded-md border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => onPageSizeChange?.(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">
            {m.table_page()} {currentPage} {m.table_of()} {pageCount}
          </span>
        </div>
        <div className="flex items-center space-x-2">
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
        <ScrollArea className="max-h-[calc(100vh-16rem)] overflow-y-auto">
          <Table>
            <TableHeader>
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
        </ScrollArea>
      </div>
    </div>
  );
}
