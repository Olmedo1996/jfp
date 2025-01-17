import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import { selectorsService } from '@/services/selectors.service';

interface UseInfiniteListOptions {
  endpoint: string;
  search?: string;
  enabled?: boolean;
  pageSize?: number;
  ordering?: string;
}

export function useInfiniteList({
  endpoint,
  search = '',
  pageSize = 10,
  ordering,
  enabled = true,
}: UseInfiniteListOptions) {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    queryKey: [endpoint, search, pageSize, ordering],
    queryFn: ({ pageParam = 1 }) =>
      selectorsService.listView({
        endpoint,
        search,
        page: pageParam,
        pageSize,
        ordering,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextPage = url.searchParams.get('page');
        return nextPage ? parseInt(nextPage) : undefined;
      }
      return undefined;
    },
    enabled,
  });

  const { fetchNextPage, hasNextPage } = query;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const items = query.data?.pages.flatMap((page) => page.results) || [];

  return {
    ...query,
    items,
    ref,
  };
}
