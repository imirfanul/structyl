import type { ApiError, QueryStatus, QueryClientConfig } from './types';

export type { QueryStatus };

export interface CacheEntry<TData = unknown> {
  data: TData | undefined;
  error: ApiError | undefined;
  status: QueryStatus;
  updatedAt: number;
  staleTime: number;
}

type Subscriber = () => void;

export function serializeKey(key: unknown[]): string {
  return JSON.stringify(key);
}

export class QueryCache {
  private entries = new Map<string, CacheEntry>();
  private subscribers = new Map<string, Set<Subscriber>>();
  private inFlight = new Map<string, Promise<unknown>>();
  // Discards responses from requests that were superseded (e.g. after cancelQueries)
  private generations = new Map<string, number>();
  // Evicts entries when no subscriber remains for longer than gcTime
  private gcTimers = new Map<string, ReturnType<typeof setTimeout>>();
  // AbortControllers for in-flight requests
  private abortControllers = new Map<string, AbortController>();
  // Global subscribers (for persistence and devtools)
  private globalSubscribers = new Set<() => void>();

  readonly gcTime: number;

  constructor(gcTime = 5 * 60_000) {
    this.gcTime = gcTime;
  }

  get<TData>(key: string): CacheEntry<TData> | undefined {
    return this.entries.get(key) as CacheEntry<TData> | undefined;
  }

  subscribe(key: string, fn: Subscriber): () => void {
    // A new subscriber cancels any pending GC eviction for this key
    const pending = this.gcTimers.get(key);
    if (pending !== undefined) {
      clearTimeout(pending);
      this.gcTimers.delete(key);
    }

    if (!this.subscribers.has(key)) this.subscribers.set(key, new Set());
    this.subscribers.get(key)!.add(fn);

    return () => {
      const set = this.subscribers.get(key);
      if (!set) return;
      set.delete(fn);
      if (set.size === 0) {
        this.subscribers.delete(key);
        // Schedule eviction after the last subscriber leaves
        const timer = setTimeout(() => {
          this.entries.delete(key);
          this.generations.delete(key);
          this.gcTimers.delete(key);
        }, this.gcTime);
        this.gcTimers.set(key, timer);
      }
    };
  }

  subscribeGlobal(fn: () => void): () => void {
    this.globalSubscribers.add(fn);
    return () => this.globalSubscribers.delete(fn);
  }

  private notify(key: string): void {
    this.subscribers.get(key)?.forEach((fn) => fn());
    this.globalSubscribers.forEach((fn) => fn());
  }

  setData<TData>(key: string, data: TData, staleTime: number): void {
    this.entries.set(key, {
      data,
      error: undefined,
      status: 'success',
      updatedAt: Date.now(),
      staleTime,
    });
    this.inFlight.delete(key);
    this.notify(key);
  }

  setError(key: string, error: ApiError): void {
    const existing = this.entries.get(key);
    this.entries.set(key, {
      data: existing?.data,
      error,
      status: 'error',
      updatedAt: Date.now(),
      staleTime: 0,
    });
    this.inFlight.delete(key);
    this.notify(key);
  }

  setLoading(key: string): void {
    const existing = this.entries.get(key);
    if (existing?.status === 'loading') return;
    this.entries.set(key, {
      data: existing?.data,
      error: undefined,
      status: 'loading',
      updatedAt: existing?.updatedAt ?? 0,
      staleTime: existing?.staleTime ?? 0,
    });
    this.notify(key);
  }

  isStale(key: string): boolean {
    const e = this.entries.get(key);
    if (!e || e.status === 'idle' || e.status === 'error') return true;
    if (e.status === 'loading') return false;
    // updatedAt === 0 is the sentinel written by markStale()
    return e.updatedAt === 0 || Date.now() - e.updatedAt > e.staleTime;
  }

  // True only when markStale() was explicitly called on a successful entry.
  // Used to detect *external* invalidation (e.g. after a mutation) vs time-based
  // staleness, so the re-fetch effect doesn't loop when staleTime is 0.
  isExternallyInvalidated(key: string): boolean {
    const e = this.entries.get(key);
    return !!e && e.status === 'success' && e.updatedAt === 0;
  }

  getInFlight(key: string): Promise<unknown> | undefined {
    return this.inFlight.get(key);
  }

  setInFlight(key: string, p: Promise<unknown>): void {
    this.inFlight.set(key, p);
  }

  clearInFlight(key: string): void {
    this.inFlight.delete(key);
  }

  // Returns the new generation. Does NOT touch inFlight — call clearInFlight separately.
  bumpGeneration(key: string): number {
    const g = (this.generations.get(key) ?? 0) + 1;
    this.generations.set(key, g);
    return g;
  }

  getGeneration(key: string): number {
    return this.generations.get(key) ?? 0;
  }

  // Sets updatedAt = 0 as the sentinel for "externally invalidated"
  markStale(key: string): void {
    const e = this.entries.get(key);
    if (e) {
      this.entries.set(key, { ...e, updatedAt: 0 });
      this.notify(key);
    }
  }

  // AbortController management
  setAbortController(key: string, ctrl: AbortController): void {
    this.abortControllers.set(key, ctrl);
  }

  getAbortController(key: string): AbortController | undefined {
    return this.abortControllers.get(key);
  }

  clearAbortController(key: string): void {
    this.abortControllers.delete(key);
  }

  clear(): void {
    for (const timer of this.gcTimers.values()) clearTimeout(timer);
    this.gcTimers.clear();
    // Abort all in-flight requests
    for (const ctrl of this.abortControllers.values()) ctrl.abort();
    this.abortControllers.clear();
    this.entries.clear();
    this.inFlight.clear();
    this.generations.clear();
    this.subscribers.clear();
    // globalSubscribers intentionally NOT cleared — they survive cache clears
  }

  snapshot(): Record<string, CacheEntry> {
    const result: Record<string, CacheEntry> = {};
    for (const [key, entry] of this.entries) {
      if (entry.status === 'success') result[key] = entry;
    }
    return result;
  }

  restore(state: Record<string, CacheEntry>): void {
    for (const [key, entry] of Object.entries(state)) {
      if (!this.entries.has(key)) this.entries.set(key, entry);
    }
  }
}

export class QueryClient {
  readonly cache: QueryCache;
  private readonly config: QueryClientConfig;

  constructor(config?: QueryClientConfig) {
    this.config = config ?? {};
    this.cache = new QueryCache(config?.gcTime);
  }

  getQueryData<TData>(key: unknown[]): TData | undefined {
    return this.cache.get<TData>(serializeKey(key))?.data;
  }

  setQueryData<TData>(
    key: unknown[],
    updater: TData | ((old: TData | undefined) => TData),
  ): void {
    const k = serializeKey(key);
    const existing = this.cache.get<TData>(k);
    const newData =
      typeof updater === 'function'
        ? (updater as (old: TData | undefined) => TData)(existing?.data)
        : updater;
    this.cache.setData(k, newData, existing?.staleTime ?? 60_000);
    this.config.onSuccess?.(newData, k);
  }

  invalidateQueries(options: { queryKey: unknown[] }): void {
    this.cache.markStale(serializeKey(options.queryKey));
  }

  async cancelQueries(options: { queryKey: unknown[] }): Promise<void> {
    const k = serializeKey(options.queryKey);
    this.cache.getAbortController(k)?.abort();
    this.cache.clearAbortController(k);
    this.cache.bumpGeneration(k);
    this.cache.clearInFlight(k);
    this.cache.markStale(k);
  }

  async prefetchQuery<TData>(options: {
    queryKey: unknown[];
    queryFn: () => Promise<TData>;
    staleTime?: number;
  }): Promise<void> {
    const k = serializeKey(options.queryKey);
    if (!this.cache.isStale(k)) return;
    try {
      const data = await options.queryFn();
      this.cache.setData(k, data, options.staleTime ?? 60_000);
      this.config.onSuccess?.(data, k);
    } catch {
      // Prefetch failures are silent; the client will re-fetch
    }
  }

  // Called internally after setData / setError to fire global callbacks
  notifySuccess(data: unknown, key: string): void {
    this.config.onSuccess?.(data, key);
  }

  notifyError(error: import('./types').ApiError, key: string): void {
    this.config.onError?.(error, key);
  }
}
