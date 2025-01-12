import { ColumnDef } from '@tanstack/react-table';

export interface DataViewProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  pageCount?: number;
  currentPage?: number;
  pageSize?: number;
  error: Error | null;
  onSearch?: (value: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  createUrl?: string;
  title: string;
  searchPlaceholder?: string;
}
