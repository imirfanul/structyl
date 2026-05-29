import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import type { AxiosInstance } from 'axios';
import { serializeKey } from '../cache';
import { useApiContext } from '../provider';
import type { ApiError, UseApiQueryOptions, ApiQueryResult } from '../types';
import { withRetry, toApiError } from '../utils';

type FetcherFn<TData> = (instance: AxiosInstance) => Promise<TData>;

// Internal fetcher receives a signal for AbortController support
type InternalFetcherFn<TData> = (signal: AbortSignal) => Promise<TData>;

// Overload 1: useApiQuery('/users')  — URL is both key and fetcher
export function useApiQuery<TData = unknown, TSelected = TData>(
  url: string,
  options?: UseApiQueryOptions<TData, TSelected>,
): ApiQueryResult<TSelected>;

// Overload 2: useApiQuery(['/users', id], '/users/1') or useApiQuery(key, fetcherFn)
export function useApiQuery<TData = unknown, TSelected = TData>(
  key: unknown[] | string,
  urlOrFn: string | FetcherFn<TData>,
  options?: UseApiQueryOptions<TData, TSelected>,
): ApiQueryResult<TSelected>;

export function useApiQuery<TData = unknown, TSelected = TData>(
  keyOrUrl: string | unknown[],
  urlOrFnOrOptions?: string | FetcherFn<TData> | UseApiQueryOptions<TData, TSelected>,
  maybeOptions?: UseApiQueryOptions<TData, TSelected>,
): ApiQueryResult<TSelected> {
  const { apiClient, queryClient } = useApiContext();

  // Resolve overloads into a stable serialized key + a fetcher ref.
  // The fetcher is stored in a ref so doFetch's useCallback deps stay stable
  // even when the URL or custom fn changes between renders.
  let serializedKey: string;
  let options: UseApiQueryOptions<TData, TSelected> | undefined;

  const fetcherRef = useRef<InternalFetcherFn<TData>>(null!);

  if (typeof urlOrFnOrOptions === 'string') {
    const url = urlOrFnOrOptions;
    serializedKey = serializeKey(
      typeof keyOrUrl === 'string' ? [keyOrUrl] : keyOrUrl,
    );
    fetcherRef.current = (signal) =>
      apiClient.instance.get<TData>(url, { signal }).then((r) => r.data);
    options = maybeOptions;
  } else if (typeof urlOrFnOrOptions === 'function') {
    const fn = urlOrFnOrOptions;
    serializedKey = serializeKey(
      typeof keyOrUrl === 'string' ? [keyOrUrl] : keyOrUrl,
    );
    // Custom fetcher — signal is not forwarded (backward-compat)
    fetcherRef.current = (_signal) => fn(apiClient.instance);
    options = maybeOptions;
  } else {
    const url = keyOrUrl as string;
    serializedKey = serializeKey([url]);
    fetcherRef.current = (signal) =>
      apiClient.instance.get<TData>(url, { signal }).then((r) => r.data);
    options = urlOrFnOrOptions;
  }

  const retries = options?.retry === false ? 0 : (options?.retry ?? 1);
  const staleTime = options?.staleTime ?? 60_000;

  // initialData: populate cache before first render if empty
  if (options?.initialData !== undefined && !queryClient.cache.get(serializedKey)) {
    queryClient.cache.setData(serializedKey, options.initialData, staleTime);
  }

  // keepPreviousData: track last non-undefined data
  const previousDataRef = useRef<TSelected | undefined>(undefined);

  // Debounce timer ref
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const doFetch = useCallback(
    async (force = false) => {
      if (!force && !queryClient.cache.isStale(serializedKey)) return;
      // Deduplicate concurrent calls — only one in-flight request per key
      if (queryClient.cache.getInFlight(serializedKey)) return;

      // Create AbortController for this fetch
      const ctrl = new AbortController();
      queryClient.cache.setAbortController(serializedKey, ctrl);

      queryClient.cache.setLoading(serializedKey);
      // Bump generation AFTER the in-flight guard so bumpGeneration no longer
      // needs to clear inFlight (fixes the race window between guard and setInFlight)
      const gen = queryClient.cache.bumpGeneration(serializedKey);

      const signal = ctrl.signal;
      const promise = withRetry(() => fetcherRef.current(signal), retries);
      queryClient.cache.setInFlight(serializedKey, promise);

      try {
        const data = await promise;
        // Discard if a newer generation started (e.g. cancelQueries during optimistic update)
        if (queryClient.cache.getGeneration(serializedKey) !== gen) return;
        queryClient.cache.setData(serializedKey, data, staleTime);
        queryClient.notifySuccess(data, serializedKey);
        queryClient.cache.clearAbortController(serializedKey);
      } catch (err) {
        if (queryClient.cache.getGeneration(serializedKey) !== gen) return;
        // Ignore abort errors — they are expected when the component unmounts or query is cancelled
        if (err instanceof Error && err.name === 'CanceledError') return;
        const apiError = toApiError(err);
        queryClient.cache.setError(serializedKey, apiError);
        queryClient.notifyError(apiError, serializedKey);
        queryClient.cache.clearAbortController(serializedKey);
      }
    },
    [serializedKey, staleTime, retries, queryClient],
  );

  // Debounced version of doFetch
  const debouncedDoFetch = useCallback(
    (force = false) => {
      const debounceMs = options?.debounce;
      if (debounceMs) {
        if (debounceTimerRef.current !== undefined) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          debounceTimerRef.current = undefined;
          void doFetch(force);
        }, debounceMs);
      } else {
        void doFetch(force);
      }
    },
    [doFetch, options?.debounce],
  );

  const entry = useSyncExternalStore(
    (notify) => queryClient.cache.subscribe(serializedKey, notify),
    () => queryClient.cache.get<TData>(serializedKey),
    () => queryClient.cache.get<TData>(serializedKey),
  );

  // Initial fetch (and re-fetch when key/enabled changes)
  useEffect(() => {
    if (options?.enabled === false) return;
    debouncedDoFetch();

    // Cleanup: abort in-flight request on unmount
    return () => {
      if (debounceTimerRef.current !== undefined) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = undefined;
      }
      queryClient.cache.getAbortController(serializedKey)?.abort();
      queryClient.cache.clearAbortController(serializedKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDoFetch, options?.enabled]);

  // Re-fetch when explicitly invalidated externally (e.g. after a mutation).
  // Uses isExternallyInvalidated (updatedAt === 0 sentinel) rather than isStale
  // so that staleTime: 0 does NOT cause an infinite re-fetch loop.
  useEffect(() => {
    if (options?.enabled === false) return;
    if (queryClient.cache.isExternallyInvalidated(serializedKey)) debouncedDoFetch();
  }, [entry, debouncedDoFetch, serializedKey, options?.enabled, queryClient]);

  // Polling
  useEffect(() => {
    if (!options?.pollInterval) return;
    const id = setInterval(() => debouncedDoFetch(true), options.pollInterval);
    return () => clearInterval(id);
  }, [debouncedDoFetch, options?.pollInterval]);

  // Refetch on window focus (time-based staleness path — not the invalidation path)
  useEffect(() => {
    const enabled = options?.refetchOnWindowFocus ?? true;
    if (!enabled || typeof window === 'undefined') return;
    const handler = () => {
      if (queryClient.cache.isStale(serializedKey)) debouncedDoFetch();
    };
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, [debouncedDoFetch, serializedKey, options?.refetchOnWindowFocus, queryClient]);

  const rawData = entry?.data;
  let data: TSelected | undefined =
    options?.select !== undefined && rawData !== undefined
      ? options.select(rawData)
      : (rawData as unknown as TSelected | undefined);

  // placeholderData: show placeholder while loading and no data yet
  let isPlaceholderData = false;
  if (data === undefined && entry?.status === 'loading' && options?.placeholderData !== undefined) {
    data = options.placeholderData;
    isPlaceholderData = true;
  }

  // keepPreviousData: return last non-undefined data when data is undefined
  if (data !== undefined) {
    previousDataRef.current = data;
  } else if (options?.keepPreviousData && previousDataRef.current !== undefined) {
    data = previousDataRef.current;
  }

  return {
    data,
    isLoading: entry?.status === 'loading' && entry?.data === undefined,
    isRefetching: entry?.status === 'loading' && entry?.data !== undefined,
    isFetching: entry?.status === 'loading',
    isPlaceholderData,
    isSuccess: entry?.status === 'success',
    isError: entry?.status === 'error',
    error: entry?.error ?? null,
    status: entry?.status ?? 'idle',
    refetch: () => void doFetch(true),
  };
}
