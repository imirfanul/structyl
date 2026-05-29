import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createApiClient } from '../client';
import { QueryClient } from '../cache';
import { ApiProvider } from '../provider';
import { useApiQueries } from '../hooks/useApiQueries';

function makeWrapper(queryClient: QueryClient, apiClient: ReturnType<typeof createApiClient>) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ApiProvider client={apiClient} queryClient={queryClient}>
        {children}
      </ApiProvider>
    );
  };
}

describe('useApiQueries', () => {
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

  it('fetches multiple queries in parallel', async () => {
    mock.onGet('/a').reply(200, { id: 'a' });
    mock.onGet('/b').reply(200, { id: 'b' });

    const { result } = renderHook(
      () =>
        useApiQueries([
          { url: '/a', options: { retry: false } },
          { url: '/b', options: { retry: false } },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    await waitFor(() => expect(result.current[1].isSuccess).toBe(true));
    expect(result.current[0].data).toEqual({ id: 'a' });
    expect(result.current[1].data).toEqual({ id: 'b' });
  });

  it('returns an array with the same length as the queries input', async () => {
    mock.onGet('/x').reply(200, 'x');
    mock.onGet('/y').reply(200, 'y');
    mock.onGet('/z').reply(200, 'z');

    const { result } = renderHook(
      () =>
        useApiQueries([
          { url: '/x', options: { retry: false } },
          { url: '/y', options: { retry: false } },
          { url: '/z', options: { retry: false } },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => result.current.every((r) => r.isSuccess));
    expect(result.current).toHaveLength(3);
  });

  it('supports independent custom keys per query', async () => {
    mock.onGet('/users').reply(200, [{ id: 1 }]);
    mock.onGet('/posts').reply(200, [{ id: 2 }]);

    const { result } = renderHook(
      () =>
        useApiQueries([
          { url: '/users', key: ['users-list'], options: { retry: false } },
          { url: '/posts', key: ['posts-list'], options: { retry: false } },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => result.current.every((r) => r.isSuccess));
    expect(result.current[0].data).toEqual([{ id: 1 }]);
    expect(result.current[1].data).toEqual([{ id: 2 }]);
  });

  // ── select ────────────────────────────────────────────────────────────────────

  it('applies select transform per query', async () => {
    mock.onGet('/nums').reply(200, [1, 2, 3]);

    const { result } = renderHook(
      () =>
        useApiQueries<number[], number>([
          {
            url: '/nums',
            options: {
              retry: false,
              select: (data) => data.reduce((a, b) => a + b, 0),
            },
          },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(result.current[0].data).toBe(6);
  });

  // ── enabled ───────────────────────────────────────────────────────────────────

  it('respects enabled: false per query', async () => {
    mock.onGet('/disabled').reply(200, { value: 1 });

    const { result } = renderHook(
      () => useApiQueries([{ url: '/disabled', options: { enabled: false } }]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    // Small wait to confirm it stays idle
    await new Promise((r) => setTimeout(r, 30));
    expect(result.current[0].status).toBe('idle');
    expect(result.current[0].data).toBeUndefined();
  });

  it('fetches enabled queries and skips disabled ones in the same call', async () => {
    mock.onGet('/active').reply(200, { ok: true });

    const { result } = renderHook(
      () =>
        useApiQueries([
          { url: '/active', options: { retry: false } },
          { url: '/inactive', options: { enabled: false } },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(result.current[1].status).toBe('idle');
  });

  // ── Error paths ───────────────────────────────────────────────────────────────

  it('surfaces error state per query independently', async () => {
    mock.onGet('/ok').reply(200, { ok: true });
    mock.onGet('/fail').reply(404, { message: 'Not found' });

    const { result } = renderHook(
      () =>
        useApiQueries([
          { url: '/ok', options: { retry: false } },
          { url: '/fail', options: { retry: false } },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    await waitFor(() => expect(result.current[1].isError).toBe(true));
    expect(result.current[1].error?.status).toBe(404);
    expect(result.current[1].error?.message).toBe('Not found');
  });

  // ── refetch ───────────────────────────────────────────────────────────────────

  it('refetch() forces a new request for the targeted query', async () => {
    let callCount = 0;
    mock.onGet('/refetch').reply(() => {
      callCount++;
      return [200, { n: callCount }];
    });

    const { result } = renderHook(
      () =>
        useApiQueries([{ url: '/refetch', options: { retry: false, staleTime: 60_000 } }]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(callCount).toBe(1);
    expect(result.current[0].data).toEqual({ n: 1 });

    act(() => result.current[0].refetch());
    await waitFor(() => expect(result.current[0].data).toEqual({ n: 2 }));
    expect(callCount).toBe(2);
  });

  it('refetch() only re-fetches the targeted query, not others', async () => {
    let aCount = 0;
    let bCount = 0;
    mock.onGet('/count-a').reply(() => [200, { n: ++aCount }]);
    mock.onGet('/count-b').reply(() => [200, { n: ++bCount }]);

    const { result } = renderHook(
      () =>
        useApiQueries([
          { url: '/count-a', options: { retry: false, staleTime: 60_000 } },
          { url: '/count-b', options: { retry: false, staleTime: 60_000 } },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => result.current.every((r) => r.isSuccess));
    expect(aCount).toBe(1);
    expect(bCount).toBe(1);

    act(() => result.current[0].refetch());
    await waitFor(() => expect(result.current[0].data).toEqual({ n: 2 }));
    expect(aCount).toBe(2);
    expect(bCount).toBe(1); // untouched
  });

  // ── placeholderData ───────────────────────────────────────────────────────────

  it('shows placeholderData while query is loading', async () => {
    mock.onGet('/slow').reply(
      () =>
        new Promise<[number, unknown]>((resolve) =>
          setTimeout(() => resolve([200, { real: true }]), 50),
        ),
    );

    const { result } = renderHook(
      () =>
        useApiQueries<{ real: boolean }, { real: boolean; placeholder?: boolean }>([
          {
            url: '/slow',
            options: {
              retry: false,
              placeholderData: { real: false, placeholder: true },
            },
          },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    expect(result.current[0].isPlaceholderData).toBe(true);
    expect(result.current[0].data).toEqual({ real: false, placeholder: true });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(result.current[0].isPlaceholderData).toBe(false);
    expect(result.current[0].data).toEqual({ real: true });
  });

  // ── keepPreviousData ──────────────────────────────────────────────────────────

  it('keepPreviousData returns stale data while the new query loads', async () => {
    mock.onGet('/page/1').reply(200, { page: 1 });
    mock.onGet('/page/2').reply(
      () =>
        new Promise<[number, unknown]>((resolve) =>
          setTimeout(() => resolve([200, { page: 2 }]), 50),
        ),
    );

    let page = 1;
    const { result, rerender } = renderHook(
      () =>
        useApiQueries([
          { url: `/page/${page}`, key: [`page-${page}`], options: { retry: false, keepPreviousData: true } },
        ]),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(result.current[0].data).toEqual({ page: 1 });

    page = 2;
    rerender();

    // While page 2 loads, keepPreviousData should return page 1's data
    await waitFor(() => expect(result.current[0].isFetching).toBe(true));
    expect(result.current[0].data).toEqual({ page: 1 });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(result.current[0].data).toEqual({ page: 2 });
  });
});
