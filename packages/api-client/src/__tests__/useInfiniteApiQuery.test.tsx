import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createApiClient } from '../client';
import { QueryClient } from '../cache';
import { ApiProvider } from '../provider';
import { useInfiniteApiQuery } from '../hooks/useInfiniteApiQuery';

function makeWrapper(queryClient: QueryClient, apiClient: ReturnType<typeof createApiClient>) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ApiProvider client={apiClient} queryClient={queryClient}>
        {children}
      </ApiProvider>
    );
  };
}

interface Page {
  items: string[];
  nextCursor?: string;
}

describe('useInfiniteApiQuery', () => {
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

  it('fetches the first page on mount', async () => {
    mock.onGet('/items').reply(200, { items: ['a', 'b'], nextCursor: 'cursor2' } as Page);

    const { result } = renderHook(
      () =>
        useInfiniteApiQuery<Page>('/items', {
          retry: false,
          getNextPageParam: (page) => page.nextCursor,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.data?.pages[0]).toEqual({ items: ['a', 'b'], nextCursor: 'cursor2' });
    expect(result.current.hasNextPage).toBe(true);
  });

  it('fetchNextPage appends the next page', async () => {
    mock
      .onGet('/paged')
      .replyOnce(200, { items: ['a'], nextCursor: 'c2' } as Page)
      .onGet('/paged?cursor=c2')
      .replyOnce(200, { items: ['b'], nextCursor: undefined } as Page);

    const { result } = renderHook(
      () =>
        useInfiniteApiQuery<Page>('/paged', {
          retry: false,
          getNextPageParam: (page) => page.nextCursor,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages).toHaveLength(1);

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));
    expect(result.current.data?.pages[1]).toEqual({ items: ['b'], nextCursor: undefined });
    expect(result.current.hasNextPage).toBe(false);
  });

  it('hasNextPage is false when getNextPageParam returns undefined', async () => {
    mock.onGet('/final').reply(200, { items: ['z'] } as Page);

    const { result } = renderHook(
      () =>
        useInfiniteApiQuery<Page>('/final', {
          retry: false,
          getNextPageParam: (page) => page.nextCursor, // undefined → no next page
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(false);
  });

  it('fetchNextPage is a no-op when hasNextPage is false', async () => {
    let callCount = 0;
    mock.onGet('/noop').reply(() => {
      callCount++;
      return [200, { items: ['x'] } as Page];
    });

    const { result } = renderHook(
      () =>
        useInfiniteApiQuery<Page>('/noop', {
          retry: false,
          getNextPageParam: () => undefined, // always no next page
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);

    act(() => result.current.fetchNextPage());
    await new Promise((r) => setTimeout(r, 30));
    // callCount should still be 1 since there's no next page
    expect(callCount).toBe(1);
  });

  // ── fetchPreviousPage ─────────────────────────────────────────────────────────

  it('fetchPreviousPage prepends a page to the front of the list', async () => {
    mock
      .onGet('/bidirectional')
      .replyOnce(200, { items: ['b'], nextCursor: 'c3', prevCursor: 'c1' } as Page & { prevCursor?: string })
      .onGet('/bidirectional?cursor=c1')
      .replyOnce(200, { items: ['a'] } as Page);

    const { result } = renderHook(
      () =>
        useInfiniteApiQuery<Page & { prevCursor?: string }>('/bidirectional', {
          retry: false,
          getNextPageParam: (page) => page.nextCursor,
          getPreviousPageParam: (page) => page.prevCursor,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.hasPreviousPage).toBe(true);

    act(() => {
      result.current.fetchPreviousPage();
    });

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));
    // Previous page is prepended — it comes first
    expect(result.current.data?.pages[0]).toEqual({ items: ['a'] });
    expect(result.current.data?.pages[1].items).toEqual(['b']);
  });

  it('fetchPreviousPage is a no-op when hasPreviousPage is false', async () => {
    let callCount = 0;
    mock.onGet('/no-prev').reply(() => {
      callCount++;
      return [200, { items: ['x'] } as Page]; // no prevCursor
    });

    const { result } = renderHook(
      () =>
        useInfiniteApiQuery<Page>('/no-prev', {
          retry: false,
          getNextPageParam: () => undefined,
          getPreviousPageParam: () => undefined,
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(callCount).toBe(1);
    expect(result.current.hasPreviousPage).toBe(false);

    act(() => result.current.fetchPreviousPage());
    await new Promise((r) => setTimeout(r, 30));
    expect(callCount).toBe(1); // no extra request
  });

  // ── custom fetchPage ──────────────────────────────────────────────────────────

  it('uses custom fetchPage option instead of the default cursor URL', async () => {
    const pages: Record<number, string[]> = {
      1: ['alpha', 'beta'],
      2: ['gamma', 'delta'],
    };

    const { result } = renderHook(
      () =>
        useInfiniteApiQuery<string[]>('/custom-fetch', {
          retry: false,
          getNextPageParam: (_lastPage, allPages) =>
            allPages.length < 2 ? allPages.length + 1 : undefined,
          fetchPage: (pageParam) =>
            Promise.resolve(pages[(pageParam as number) ?? 1] ?? []),
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0]).toEqual(['alpha', 'beta']);
    expect(result.current.hasNextPage).toBe(true);

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));
    expect(result.current.data?.pages[1]).toEqual(['gamma', 'delta']);
    expect(result.current.hasNextPage).toBe(false);
  });
});
