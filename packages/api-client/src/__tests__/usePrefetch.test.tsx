import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createApiClient } from '../client';
import { QueryClient, serializeKey } from '../cache';
import { ApiProvider } from '../provider';
import { usePrefetch } from '../hooks/usePrefetch';

function makeWrapper(queryClient: QueryClient, apiClient: ReturnType<typeof createApiClient>) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ApiProvider client={apiClient} queryClient={queryClient}>
        {children}
      </ApiProvider>
    );
  };
}

describe('usePrefetch', () => {
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

  it('calling the returned function populates the cache', async () => {
    mock.onGet('/prefetch-me').reply(200, { prefetched: true });

    const { result } = renderHook(
      () => usePrefetch('/prefetch-me'),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    // Cache should be empty before prefetch
    expect(queryClient.cache.get(serializeKey(['/prefetch-me']))).toBeUndefined();

    act(() => {
      result.current(); // trigger the prefetch
    });

    await waitFor(() => {
      const entry = queryClient.cache.get(serializeKey(['/prefetch-me']));
      return entry?.status === 'success';
    });

    const entry = queryClient.cache.get(serializeKey(['/prefetch-me']));
    expect(entry?.data).toEqual({ prefetched: true });
  });

  it('does not fetch if data is already fresh', async () => {
    let callCount = 0;
    mock.onGet('/already-cached').reply(() => {
      callCount++;
      return [200, { n: callCount }];
    });

    // Pre-populate cache
    queryClient.cache.setData(serializeKey(['/already-cached']), { n: 0 }, 60_000);

    const { result } = renderHook(
      () => usePrefetch('/already-cached'),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current());
    await new Promise((r) => setTimeout(r, 30));

    // No fetch should have happened — data was fresh
    expect(callCount).toBe(0);
  });

  it('returns a stable callback reference', () => {
    mock.onGet('/stable').reply(200, {});

    const { result, rerender } = renderHook(
      () => usePrefetch('/stable'),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    const first = result.current;
    rerender();
    const second = result.current;
    expect(first).toBe(second);
  });
});
