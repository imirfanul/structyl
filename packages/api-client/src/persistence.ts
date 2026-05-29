import type { QueryClient, CacheEntry } from './cache';
import type { PersistenceStorage, PersistenceConfig } from './types';

export type { PersistenceStorage, PersistenceConfig };

interface PersistedCache {
  entries: Record<string, CacheEntry>;
  savedAt: number;
}

export async function persistCache(
  queryClient: QueryClient,
  config: PersistenceConfig,
): Promise<() => void> {
  const storageKey = config.key ?? 'aura-ui-cache';
  const maxAge = config.maxAge ?? 24 * 60 * 60_000;

  // 1. Restore from storage on init
  try {
    const raw = await config.storage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedCache;
      if (parsed.savedAt + maxAge > Date.now()) {
        queryClient.cache.restore(parsed.entries);
      } else {
        // Expired — remove stale data
        void config.storage.removeItem(storageKey);
      }
    }
  } catch {
    // Ignore parse/read errors
  }

  // 2. Subscribe to global cache changes and debounce writes
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const write = () => {
    if (debounceTimer !== undefined) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceTimer = undefined;
      const snapshot = queryClient.cache.snapshot();
      const payload: PersistedCache = {
        entries: snapshot,
        savedAt: Date.now(),
      };
      void config.storage.setItem(storageKey, JSON.stringify(payload));
    }, 1000);
  };

  const unsubscribe = queryClient.cache.subscribeGlobal(write);

  // Return cleanup function
  return () => {
    unsubscribe();
    if (debounceTimer !== undefined) {
      clearTimeout(debounceTimer);
      debounceTimer = undefined;
    }
  };
}
