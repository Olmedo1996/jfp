import { useCallback, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';

import {
  PaginatedResponse,
  TableParams,
  UseTableOptions,
} from '@/types/table.types';

export function useGenericTable<TData>({
  queryKey,
  fetchData,
  initialParams = {
    page: 1,
    pageSize: 10,
  },
}: UseTableOptions<TData>) {
  const [params, setParams] = useState<TableParams>(initialParams);

  const query = useQuery<PaginatedResponse<TData>>({
    queryKey: [...queryKey, params],
    queryFn: () => fetchData(params),
  });

  const debounceSearch = useRef(
    debounce((search: string) => {
      setParams((prev) => ({ ...prev, search, page: 1 }));
    }, 500)
  );
  const debouncedSearch = useCallback(
    (search: string) => debounceSearch.current(search),
    [debounceSearch]
  );

  const handleSearch = (search: string) => {
    debouncedSearch(search);
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setParams((prev) => ({ ...prev, pageSize, page: 1 }));
  };

  return {
    ...query,
    params,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
  };
}
