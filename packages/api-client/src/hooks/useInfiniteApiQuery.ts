import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { serializeKey } from '../cache';
import { useApiContext } from '../provider';
import type {
  UseInfiniteApiQueryOptions,
  InfiniteData,
  InfiniteApiQueryResult,
} from '../types';
import { withRetry, toApiError } from '../utils';

export function useInfiniteApiQuery<TData = unknown>(
  url: string,
  options: UseInfiniteApiQueryOptions<TData>,
): InfiniteApiQueryResult<TData> {
  const { apiClient, queryClient } = useApiContext();

  const cacheKey = serializeKey(['__inf__', url]);
  const retries = options.retry === false ? 0 : (options.retry ?? 1);
  const staleTime = options.staleTime ?? 60_000;

  // Store options in a ref to avoid stale closures in callbacks
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isFetchingPreviousPage, setIsFetchingPreviousPage] = useState(false);

  const entry = useSyncExternalStore(
    (notify) => queryClient.cache.subscribe(cacheKey, notify),
    () => queryClient.cache.get<InfiniteData<TData>>(cacheKey),
    () => queryClient.cache.get<InfiniteData<TData>>(cacheKey),
  );

  // Build the URL for a given pageParam
  const buildUrl = (pageParam: unknown): string => {
    if (pageParam == null) return url;
    return url + (url.includes('?') ? '&' : '?') + 'cursor=' + String(pageParam);
  };

  // Fetch a single page
  const fetchOnePage = useCallback(
    (pageParam: unknown): Promise<TData> => {
      const currentOptions = optionsRef.current;
      if (currentOptions.fetchPage) {
        return withRetry(() => currentOptions.fetchPage!(pageParam, apiClient.instance), retries);
      }
      return withRetry(
        () => apiClient.instance.get<TData>(buildUrl(pageParam)).then((r) => r.data),
        retries,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiClient, retries, url],
  );

  // Initial fetch
  const doInitialFetch = useCallback(async () => {
    if (queryClient.cache.getInFlight(cacheKey)) return;

    queryClient.cache.setLoading(cacheKey);
    const gen = queryClient.cache.bumpGeneration(cacheKey);

    const promise = fetchOnePage(undefined);
    queryClient.cache.setInFlight(cacheKey, promise);

    try {
      const firstPage = await promise;
      if (queryClient.cache.getGeneration(cacheKey) !== gen) return;
      const infiniteData: InfiniteData<TData> = {
        pages: [firstPage],
        pageParams: [undefined],
      };
      queryClient.cache.setData(cacheKey, infiniteData, staleTime);
    } catch (err) {
      if (queryClient.cache.getGeneration(cacheKey) !== gen) return;
      const apiError = toApiError(err);
      queryClient.cache.setError(cacheKey, apiError);
    }
  }, [cacheKey, fetchOnePage, staleTime, queryClient]);

  useEffect(() => {
    if (options.enabled === false) return;
    if (!queryClient.cache.isStale(cacheKey)) return;
    void doInitialFetch();
  }, [doInitialFetch, cacheKey, options.enabled, queryClient]);

  const fetchNextPage = useCallback(() => {
    const currentData = queryClient.cache.get<InfiniteData<TData>>(cacheKey)?.data;
    if (!currentData || currentData.pages.length === 0) return;

    const lastPage = currentData.pages[currentData.pages.length - 1];
    const nextPageParam = optionsRef.current.getNextPageParam(lastPage, currentData.pages);
    if (nextPageParam === undefined) return;

    setIsFetchingNextPage(true);
    void fetchOnePage(nextPageParam)
      .then((newPage) => {
        const latestData = queryClient.cache.get<InfiniteData<TData>>(cacheKey)?.data;
        if (!latestData) return;
        const updated: InfiniteData<TData> = {
          pages: [...latestData.pages, newPage],
          pageParams: [...latestData.pageParams, nextPageParam],
        };
        queryClient.cache.setData(cacheKey, updated, staleTime);
      })
      .catch((err: unknown) => {
        const apiError = toApiError(err);
        queryClient.cache.setError(cacheKey, apiError);
      })
      .finally(() => {
        setIsFetchingNextPage(false);
      });
  }, [cacheKey, fetchOnePage, staleTime, queryClient]);

  const fetchPreviousPage = useCallback(() => {
    const currentData = queryClient.cache.get<InfiniteData<TData>>(cacheKey)?.data;
    if (!currentData || currentData.pages.length === 0) return;

    const getPreviousPageParam = optionsRef.current.getPreviousPageParam;
    if (!getPreviousPageParam) return;

    const firstPage = currentData.pages[0];
    const prevPageParam = getPreviousPageParam(firstPage, currentData.pages);
    if (prevPageParam === undefined) return;

    setIsFetchingPreviousPage(true);
    void fetchOnePage(prevPageParam)
      .then((newPage) => {
        const latestData = queryClient.cache.get<InfiniteData<TData>>(cacheKey)?.data;
        if (!latestData) return;
        const updated: InfiniteData<TData> = {
          pages: [newPage, ...latestData.pages],
          pageParams: [prevPageParam, ...latestData.pageParams],
        };
        queryClient.cache.setData(cacheKey, updated, staleTime);
      })
      .catch((err: unknown) => {
        const apiError = toApiError(err);
        queryClient.cache.setError(cacheKey, apiError);
      })
      .finally(() => {
        setIsFetchingPreviousPage(false);
      });
  }, [cacheKey, fetchOnePage, staleTime, queryClient]);

  const refetch = useCallback(() => {
    // Clear data and re-fetch from the first page
    queryClient.cache.bumpGeneration(cacheKey);
    queryClient.cache.clearInFlight(cacheKey);
    void doInitialFetch();
  }, [cacheKey, doInitialFetch, queryClient]);

  const infiniteData = entry?.data;

  // Compute hasNextPage / hasPreviousPage
  let hasNextPage = false;
  let hasPreviousPage = false;
  if (infiniteData && infiniteData.pages.length > 0) {
    const lastPage = infiniteData.pages[infiniteData.pages.length - 1];
    hasNextPage = optionsRef.current.getNextPageParam(lastPage, infiniteData.pages) !== undefined;

    if (optionsRef.current.getPreviousPageParam) {
      const firstPage = infiniteData.pages[0];
      hasPreviousPage =
        optionsRef.current.getPreviousPageParam(firstPage, infiniteData.pages) !== undefined;
    }
  }

  return {
    data: infiniteData,
    isLoading: entry?.status === 'loading' && entry?.data === undefined,
    isFetching: entry?.status === 'loading',
    isFetchingNextPage,
    isFetchingPreviousPage,
    isSuccess: entry?.status === 'success',
    isError: entry?.status === 'error',
    error: entry?.error ?? null,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
  };
}
