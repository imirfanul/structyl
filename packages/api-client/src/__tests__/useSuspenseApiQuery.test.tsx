import React, { Suspense } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createApiClient } from '../client';
import { QueryClient } from '../cache';
import { ApiProvider } from '../provider';
import { useSuspenseApiQuery } from '../hooks/useSuspenseApiQuery';

function makeWrapper(queryClient: QueryClient, apiClient: ReturnType<typeof createApiClient>) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ApiProvider client={apiClient} queryClient={queryClient}>
        <Suspense fallback={null}>{children}</Suspense>
      </ApiProvider>
    );
  };
}

describe('useSuspenseApiQuery', () => {
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

  // ── Happy paths ───────────────────────────────────────────────────────────────

  it('suspends during loading and resolves with data', async () => {
    mock.onGet('/suspense').reply(200, { value: 42 });

    const { result } = renderHook(
      () => useSuspenseApiQuery<{ value: number }>('/suspense', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ value: 42 });
  });

  it('returns non-nullable data — data.field is accessible without optional chaining', async () => {
    mock.onGet('/suspense-nn').reply(200, { name: 'Claude' });

    const { result } = renderHook(
      () => useSuspenseApiQuery<{ name: string }>('/suspense-nn', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // TypeScript guarantees data is non-nullable; accessing fields should work
    expect(result.current.data.name).toBe('Claude');
  });

  it('isSuccess is always true on successful render', async () => {
    mock.onGet('/suspense-status').reply(200, { ok: true });

    const { result } = renderHook(
      () => useSuspenseApiQuery('/suspense-status', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.isSuccess).toBe(true);
  });

  // ── Cache ─────────────────────────────────────────────────────────────────────

  it('serves cached data on re-mount within staleTime — no extra request', async () => {
    let callCount = 0;
    mock.onGet('/suspense-cache').reply(() => {
      callCount++;
      return [200, { n: callCount }];
    });

    const { result } = renderHook(
      () =>
        useSuspenseApiQuery<{ n: number }>('/suspense-cache', {
          retry: false,
          staleTime: 60_000,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);

    // Second hook with same key — data is fresh, should not hit network
    const { result: result2 } = renderHook(
      () =>
        useSuspenseApiQuery<{ n: number }>('/suspense-cache', {
          retry: false,
          staleTime: 60_000,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result2.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);
    expect(result2.current.data).toEqual({ n: 1 });
  });

  it('shares in-flight deduplication — concurrent mounts make only one request', async () => {
    let callCount = 0;
    mock.onGet('/suspense-dedup').reply(
      () =>
        new Promise<[number, unknown]>((resolve) =>
          setTimeout(() => {
            callCount++;
            resolve([200, { n: callCount }]);
          }, 30),
        ),
    );

    // Mount two hooks for the same URL simultaneously
    const { result: r1 } = renderHook(
      () => useSuspenseApiQuery('/suspense-dedup', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );
    const { result: r2 } = renderHook(
      () => useSuspenseApiQuery('/suspense-dedup', { retry: false }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(r1.current.isSuccess).toBe(true));
    await waitFor(() => expect(r2.current.isSuccess).toBe(true));
    expect(callCount).toBe(1); // only one fetch despite two hooks
  });

  // ── refetch ───────────────────────────────────────────────────────────────────

  it('refetch() triggers a background re-fetch and updates data without suspending', async () => {
    let callCount = 0;
    mock.onGet('/suspense-refetch').reply(() => {
      callCount++;
      return [200, { n: callCount }];
    });

    const { result } = renderHook(
      () =>
        useSuspenseApiQuery<{ n: number }>('/suspense-refetch', {
          retry: false,
          staleTime: 60_000,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);
    expect(result.current.data).toEqual({ n: 1 });

    result.current.refetch();

    await waitFor(() => expect(result.current.data).toEqual({ n: 2 }));
    expect(callCount).toBe(2);
    // After refetch completes, still success (never suspended again)
    expect(result.current.isSuccess).toBe(true);
  });
});
