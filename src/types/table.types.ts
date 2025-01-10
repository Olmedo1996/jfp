export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface TableParams {
  search?: string;
  ordering?: string;
  page?: number;
  pageSize?: number;
}

export interface UseTableOptions<TData> {
  queryKey: string[];
  fetchData: (params: TableParams) => Promise<PaginatedResponse<TData>>;
  initialParams?: TableParams;
}
