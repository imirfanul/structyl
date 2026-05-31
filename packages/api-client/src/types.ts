import type { AxiosInstance } from 'axios';

// Defined here so cache.ts can import it without a circular dep
export type QueryStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

export interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
  getAuthToken?: () => string | null | undefined | Promise<string | null | undefined>;
  refreshToken?: () => Promise<string>;
  onRefreshError?: (err: unknown) => void;
}

export interface QueryClientConfig {
  gcTime?: number;
  onError?: (error: ApiError, key: string) => void;
  onSuccess?: (data: unknown, key: string) => void;
}

// TData  = raw type returned by the fetcher
// TSelected = type after select() transform (defaults to TData)
export interface UseApiQueryOptions<TData = unknown, TSelected = TData> {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  retry?: number | false;
  refetchOnWindowFocus?: boolean;
  pollInterval?: number;
  select?: (data: TData) => TSelected;
  initialData?: TData;
  placeholderData?: TSelected;
  keepPreviousData?: boolean;
  debounce?: number;
}

export interface OptimisticConfig<TData, TVariables> {
  queryKey: unknown[];
  updater: (oldData: TData | undefined, newData: TVariables) => TData;
}

export interface UseApiMutationOptions<TData = unknown, TVariables = unknown> {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: ApiError) => void;
  invalidates?: unknown[][];
  optimistic?: OptimisticConfig<TData, TVariables>;
  onUploadProgress?: (percentage: number) => void;
}

// TData here is the final data type (after optional select transform)
export interface ApiQueryResult<TData> {
  data: TData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isPlaceholderData: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiError | null;
  status: QueryStatus;
  refetch: () => void;
}

export interface ApiMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | undefined;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiError | null;
  reset: () => void;
}

// ── useInfiniteApiQuery ──────────────────────────────────────────────────────

export interface UseInfiniteApiQueryOptions<TData = unknown> {
  enabled?: boolean;
  staleTime?: number;
  retry?: number | false;
  getNextPageParam: (lastPage: TData, allPages: TData[]) => unknown;
  getPreviousPageParam?: (firstPage: TData, allPages: TData[]) => unknown;
  /** Custom per-page fetcher. If omitted, appends ?cursor=<pageParam> to the URL. */
  fetchPage?: (pageParam: unknown, instance: AxiosInstance) => Promise<TData>;
}

export interface InfiniteData<TData> {
  pages: TData[];
  pageParams: unknown[];
}

export interface InfiniteApiQueryResult<TData> {
  data: InfiniteData<TData> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiError | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  refetch: () => void;
}

// ── useApiQueries ─────────────────────────────────────────────────────────────

export interface ApiQueryConfig<TData = unknown, TSelected = TData> {
  url: string;
  key?: unknown[];
  options?: UseApiQueryOptions<TData, TSelected>;
}

// ── useSuspenseApiQuery ───────────────────────────────────────────────────────

export interface SuspenseApiQueryResult<TData> {
  data: TData; // non-nullable — Suspense guarantees it
  isFetching: boolean;
  isRefetching: boolean;
  isSuccess: true;
  refetch: () => void;
}

// ── persistence ───────────────────────────────────────────────────────────────

export interface PersistenceStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

export interface PersistenceConfig {
  storage: PersistenceStorage;
  /** Storage key, default 'structyl-cache' */
  key?: string;
  /** Max age in ms, default 24h */
  maxAge?: number;
}

export type { AxiosInstance };
