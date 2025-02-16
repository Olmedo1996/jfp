'use client';
import { flexRender, type Table as TableType } from '@tanstack/react-table';

import SkeletonCell from './skeleton-cell';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableSkeletonLoadingProps<TData> {
  table: TableType<TData>;
  columnsLength: number;
  rowsToShow?: number;
}

const DataTableSkeletonLoading = <TData,>({
  table,
  columnsLength,
  rowsToShow = 5,
}: DataTableSkeletonLoadingProps<TData>) => {
  return (
    <>
      {/* Skeleton for pagination controls */}

      {/* Header */}
      <div className="bg-sidebar-accent">
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
        </Table>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableBody>
            {Array.from({ length: rowsToShow }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: columnsLength }).map((_, cellIndex) => (
                  <TableCell key={cellIndex} className="p-5">
                    <SkeletonCell />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DataTableSkeletonLoading;
