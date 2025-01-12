import { flexRender, type Table as TableType } from '@tanstack/react-table';

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
    <div className="flex h-full flex-col rounded-md border">
      {/* Skeleton for pagination controls */}
      <div className="flex items-center justify-between p-4 py-8">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-[70px] animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="relative flex-1">
        <div className="absolute inset-0 flex flex-col">
          {/* Header */}
          <div className="bg-white">
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
                    {Array.from({ length: columnsLength }).map(
                      (_, cellIndex) => (
                        <TableCell key={cellIndex} className="p-5">
                          <div
                            className="h-4 animate-pulse rounded bg-gray-200"
                            style={{
                              width: `${Math.floor(Math.random() * 50 + 50)}%`,
                            }}
                          />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableSkeletonLoading;
