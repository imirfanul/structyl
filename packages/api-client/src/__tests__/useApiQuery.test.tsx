import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createApiClient } from '../client';
import { QueryClient } from '../cache';
import { ApiProvider } from '../provider';
import { useApiQuery } from '../hooks/useApiQuery';
import { dehydrate, hydrate } from '../server';
import type { ApiError } from '../types';

function makeWrapper(queryClient: QueryClient, apiClient: ReturnType<typeof createApiClient>) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ApiProvider client={apiClient} queryClient={queryClient}>
        {children}
      </ApiProvider>
    );
  };
}

describe('useApiQuery', () => {
  let apiClient: ReturnType<typeof createApiClient>;
  let mock: MockAdapter;
  let queryClient: QueryClient;

  beforeEach(() => {
    apiClient = createApiClient({ baseURL: 'https://api.test' });
    mock = new MockAdapter(apiClient.instance);
    queryClient = new QueryClient();
  });

  afterEach(() => {
    mock.reset();
    queryClient.cache.clear();
  });

  // ── Happy paths ──────────────────────────────────────────────────────────────

  it('fetches data by URL string (shorthand)', async () => {
    mock.onGet('/users').reply(200, [{ id: 1, name: 'Alice' }]);

    const { result } = renderHook(() => useApiQuery('/users', { retry: false }), {
      wrapper: makeWrapper(queryClient, apiClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('provides separate key and URL', async () => {
    mock.onGet('/users').reply(200, [{ id: 2, name: 'Bob' }]);

    const { result } = renderHook(
      () => useApiQuery(['users-list'], '/users', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: 2, name: 'Bob' }]);
  });

  it('accepts a custom fetcher function', async () => {
    mock.onGet('/users').reply(200, [{ id: 3, name: 'Carol' }]);

    const { result } = renderHook(
      () =>
        useApiQuery(
          'custom-key',
          (inst) => inst.get('/users').then((r) => r.data),
          { retry: false },
        ),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: 3, name: 'Carol' }]);
  });

  // ── Error paths ──────────────────────────────────────────────────────────────

  it('normalizes axios errors into ApiError shape', async () => {
    mock.onGet('/fail').reply(404, { message: 'Not found' });

    const { result } = renderHook(
      () => useApiQuery('/fail', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    const error = result.current.error as ApiError;
    expect(error.status).toBe(404);
    expect(error.message).toBe('Not found');
  });

  it('handles network errors (no response) as status 0', async () => {
    mock.onGet('/offline').networkError();

    const { result } = renderHook(
      () => useApiQuery('/offline', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.status).toBe(0);
  });

  // ── Enabled / disabled ───────────────────────────────────────────────────────

  it('does not fetch when enabled is false', () => {
    const { result } = renderHook(
      () => useApiQuery('/users', { enabled: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  // ── refetch ──────────────────────────────────────────────────────────────────

  it('refetch() forces a new request regardless of staleTime', async () => {
    let callCount = 0;
    mock.onGet('/items').reply(() => {
      callCount++;
      return [200, { count: callCount }];
    });

    const { result } = renderHook(
      () => useApiQuery('/items', { retry: false, staleTime: 60_000 }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);

    // staleTime hasn't elapsed, but refetch() bypasses it
    result.current.refetch();
    await waitFor(() => expect(result.current.data).toEqual({ count: 2 }));
    expect(callCount).toBe(2);
  });

  // ── isFetching ───────────────────────────────────────────────────────────────

  it('exposes isFetching and a callable refetch', async () => {
    mock.onGet('/items').reply(200, ['a', 'b']);

    const { result } = renderHook(
      () => useApiQuery('/items', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.isFetching).toBe(false);
    expect(typeof result.current.refetch).toBe('function');
  });

  // ── select ───────────────────────────────────────────────────────────────────

  it('applies select to transform data to a different type', async () => {
    mock.onGet('/nums').reply(200, [1, 2, 3]);

    const { result } = renderHook(
      () =>
        // TData = number[], TSelected = number (sum)
        useApiQuery<number[], number>('/nums', {
          retry: false,
          select: (data) => data.reduce((a, b) => a + b, 0),
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(6);
  });

  // ── staleTime ────────────────────────────────────────────────────────────────

  it('serves cached data within staleTime without re-fetching', async () => {
    let callCount = 0;
    mock.onGet('/cached').reply(() => {
      callCount++;
      return [200, { n: callCount }];
    });

    const { result } = renderHook(
      () => useApiQuery('/cached', { retry: false, staleTime: 60_000 }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);

    // Unmount and remount — data is still fresh, no second request
    const { result: result2 } = renderHook(
      () => useApiQuery('/cached', { retry: false, staleTime: 60_000 }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );
    await waitFor(() => expect(result2.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);
  });

  it('does NOT loop when staleTime is 0', async () => {
    let callCount = 0;
    mock.onGet('/zero').reply(() => {
      callCount++;
      return [200, { n: callCount }];
    });

    const { result } = renderHook(
      () => useApiQuery('/zero', { retry: false, staleTime: 0 }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Give time for any accidental extra fetches to fire
    await new Promise((r) => setTimeout(r, 50));
    // Should be exactly 1 — the invalidation effect checks isExternallyInvalidated,
    // not isStale, so staleTime: 0 doesn't trigger an infinite refetch loop
    expect(callCount).toBe(1);
  });

  // ── SSR dehydrate / hydrate ──────────────────────────────────────────────────

  it('dehydrate → hydrate roundtrip serves data without a network request', async () => {
    // Server side: prefetch into a queryClient and dehydrate
    const serverQc = new QueryClient();
    serverQc.setQueryData(['/ssr-data'], { hello: 'world' });
    const state = dehydrate(serverQc);

    // Client side: hydrate a fresh queryClient and verify data is available
    const clientQc = new QueryClient();
    hydrate(clientQc, state);

    let callCount = 0;
    mock.onGet('/ssr-data').reply(() => {
      callCount++;
      return [200, { hello: 'world' }];
    });

    const { result } = renderHook(
      () => useApiQuery('/ssr-data', { retry: false, staleTime: 60_000 }),
      { wrapper: makeWrapper(clientQc, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ hello: 'world' });
    // Data was served from the hydrated cache, not from the network
    expect(callCount).toBe(0);
  });

  // ── isRefetching ─────────────────────────────────────────────────────────────

  it('isRefetching is true when re-fetching data that is already in cache', async () => {
    let callCount = 0;
    // Instant first response, delayed second response so we can observe isRefetching
    mock
      .onGet('/refetch-test')
      .replyOnce(() => {
        callCount++;
        return [200, { n: callCount }];
      })
      .onGet('/refetch-test')
      .reply(
        () =>
          new Promise<[number, unknown]>((resolve) =>
            setTimeout(() => {
              callCount++;
              resolve([200, { n: callCount }]);
            }, 80),
          ),
      );

    const { result } = renderHook(
      () => useApiQuery('/refetch-test', { retry: false, staleTime: 60_000 }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    // Wait for initial load
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.isRefetching).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(callCount).toBe(1);

    // Trigger refetch — data is already in cache, so this is a background refresh
    result.current.refetch();

    // The refetch sets status to loading but keeps existing data → isRefetching should be true
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    expect(result.current.isRefetching).toBe(true);
    expect(result.current.isLoading).toBe(false); // data is present, so not isLoading

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.isRefetching).toBe(false);
    expect(callCount).toBe(2);
  });

  // ── initialData ──────────────────────────────────────────────────────────────

  it('initialData is available on the first render without a network call', async () => {
    let callCount = 0;
    mock.onGet('/initial').reply(() => {
      callCount++;
      return [200, { from: 'network' }];
    });

    const initial = { from: 'initial' };
    const { result } = renderHook(
      () =>
        useApiQuery('/initial', {
          retry: false,
          staleTime: 60_000,
          initialData: initial,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    // Data is immediately available without waiting
    expect(result.current.data).toEqual(initial);
    expect(result.current.isSuccess).toBe(true);
    // No network call made (data is fresh due to staleTime)
    expect(callCount).toBe(0);
  });

  // ── placeholderData ───────────────────────────────────────────────────────────

  it('placeholderData is shown while loading', async () => {
    mock.onGet('/placeholder').reply(
      () =>
        new Promise<[number, unknown]>((resolve) =>
          setTimeout(() => resolve([200, { real: true }]), 50),
        ),
    );

    const placeholder = { real: false, placeholder: true };
    const { result } = renderHook(
      () =>
        useApiQuery<{ real: boolean; placeholder?: boolean }>('/placeholder', {
          retry: false,
          placeholderData: placeholder,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    // Initially loading — placeholder should be shown
    expect(result.current.isPlaceholderData).toBe(true);
    expect(result.current.data).toEqual(placeholder);

    // After fetch completes — real data should replace placeholder
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.isPlaceholderData).toBe(false);
    expect(result.current.data).toEqual({ real: true });
  });

  // ── keepPreviousData ──────────────────────────────────────────────────────────

  it('keepPreviousData returns stale data when key changes', async () => {
    mock.onGet('/page/1').reply(200, { page: 1, items: ['a'] });
    mock.onGet('/page/2').reply(
      () =>
        new Promise<[number, unknown]>((resolve) =>
          setTimeout(() => resolve([200, { page: 2, items: ['b'] }]), 50),
        ),
    );

    let page = 1;
    const { result, rerender } = renderHook(
      () =>
        useApiQuery(`/page/${page}`, {
          retry: false,
          keepPreviousData: true,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ page: 1, items: ['a'] });

    // Change the key — page 2 takes 50ms to load
    page = 2;
    rerender();

    // While page 2 is loading, keepPreviousData should show page 1 data
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    expect(result.current.data).toEqual({ page: 1, items: ['a'] });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ page: 2, items: ['b'] });
  });

  // ── AbortController ───────────────────────────────────────────────────────────

  it('unmounting mid-flight discards the response without updating the cache', async () => {
    // Delay the response long enough to unmount first
    mock.onGet('/abort-test').reply(
      () =>
        new Promise<[number, unknown]>((resolve) =>
          setTimeout(() => resolve([200, { done: true }]), 100),
        ),
    );

    const { result, unmount } = renderHook(
      () => useApiQuery('/abort-test', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    // Wait until the fetch is in-flight
    await waitFor(() => expect(result.current.isFetching).toBe(true));

    // Unmount before the response arrives
    unmount();

    // Wait a bit past the response delay
    await new Promise((r) => setTimeout(r, 150));

    // The cache should not have been updated (generation was bumped on abort)
    const entry = queryClient.cache.get(['/abort-test'].join(''));
    // Status may be loading or undefined, but should not be 'success'
    expect(entry?.status).not.toBe('success');
  });
});
