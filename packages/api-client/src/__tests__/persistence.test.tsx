import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { QueryClient, serializeKey } from '../cache';
import { persistCache } from '../persistence';
import type { PersistenceStorage } from '../persistence';

function makeMemoryStorage(): PersistenceStorage & { store: Record<string, string> } {
  const store: Record<string, string> = {};
  return {
    store,
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
  };
}

describe('persistCache', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.useFakeTimers();
  });

  afterEach(() => {
    queryClient.cache.clear();
    vi.useRealTimers();
  });

  it('restores data from storage on init', async () => {
    const storage = makeMemoryStorage();

    // Pre-populate storage with a valid persisted cache
    const key = serializeKey(['/restored']);
    const entry = {
      data: { restored: true },
      error: undefined,
      status: 'success' as const,
      updatedAt: Date.now(),
      staleTime: 60_000,
    };
    storage.store['aura-ui-cache'] = JSON.stringify({
      entries: { [key]: entry },
      savedAt: Date.now(),
    });

    await persistCache(queryClient, { storage });

    const cached = queryClient.cache.get(key);
    expect(cached?.data).toEqual({ restored: true });
    expect(cached?.status).toBe('success');
  });

  it('does not restore data that has exceeded maxAge', async () => {
    const storage = makeMemoryStorage();

    const key = serializeKey(['/expired']);
    const entry = {
      data: { old: true },
      error: undefined,
      status: 'success' as const,
      updatedAt: 0,
      staleTime: 60_000,
    };
    // savedAt is 2 days ago
    storage.store['aura-ui-cache'] = JSON.stringify({
      entries: { [key]: entry },
      savedAt: Date.now() - 2 * 24 * 60 * 60_000,
    });

    await persistCache(queryClient, { storage, maxAge: 24 * 60 * 60_000 });

    const cached = queryClient.cache.get(key);
    expect(cached).toBeUndefined();
  });

  it('writes to storage after cache changes (debounced)', async () => {
    const storage = makeMemoryStorage();
    const setItemSpy = vi.spyOn(storage, 'setItem');

    const cleanup = await persistCache(queryClient, { storage });

    // Set some data in the cache
    queryClient.cache.setData(serializeKey(['/written']), { written: true }, 60_000);

    // Debounce timer hasn't fired yet
    expect(setItemSpy).not.toHaveBeenCalled();

    // Advance timer past debounce (1000ms)
    vi.advanceTimersByTime(1001);

    expect(setItemSpy).toHaveBeenCalledOnce();
    const written = storage.store['aura-ui-cache'];
    expect(written).toBeTruthy();
    const parsed = JSON.parse(written) as { entries: Record<string, unknown>; savedAt: number };
    expect(parsed.entries[serializeKey(['/written'])]).toBeTruthy();

    cleanup();
  });

  it('cleanup unsubscribes and stops further writes', async () => {
    const storage = makeMemoryStorage();
    const setItemSpy = vi.spyOn(storage, 'setItem');

    const cleanup = await persistCache(queryClient, { storage });
    cleanup(); // unsubscribe immediately

    queryClient.cache.setData(serializeKey(['/no-write']), { x: 1 }, 60_000);
    vi.advanceTimersByTime(1001);

    // No write should have occurred after cleanup
    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('uses custom storage key', async () => {
    const storage = makeMemoryStorage();

    const cleanup = await persistCache(queryClient, {
      storage,
      key: 'my-custom-cache-key',
    });

    queryClient.cache.setData(serializeKey(['/custom']), { c: 1 }, 60_000);
    vi.advanceTimersByTime(1001);

    expect(storage.store['my-custom-cache-key']).toBeTruthy();
    expect(storage.store['aura-ui-cache']).toBeUndefined();

    cleanup();
  });
});
