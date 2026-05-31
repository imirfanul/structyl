import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createApiClient } from '../client';
import { QueryClient } from '../cache';
import { ApiProvider } from '../provider';
import { useApiMutation } from '../hooks/useApiMutation';
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

describe('useApiMutation', () => {
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

  it('posts data and returns response', async () => {
    mock.onPost('/users').reply(201, { id: 10, name: 'Dave' });

    const { result } = renderHook(
      () => useApiMutation<{ id: number; name: string }, { name: string }>('/users'),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: 'Dave' }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ id: 10, name: 'Dave' });
  });

  it('supports PUT method', async () => {
    mock.onPut('/users/1').reply(200, { id: 1, name: 'Updated' });

    const { result } = renderHook(
      () => useApiMutation('/users/1', { method: 'PUT' }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: 'Updated' }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('supports PATCH method', async () => {
    mock.onPatch('/users/1').reply(200, { id: 1 });

    const { result } = renderHook(
      () => useApiMutation('/users/1', { method: 'PATCH' }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: 'Patched' }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('supports DELETE method', async () => {
    mock.onDelete('/users/1').reply(204);

    const { result } = renderHook(
      () => useApiMutation('/users/1', { method: 'DELETE' }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate(undefined));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('accepts a custom mutation function', async () => {
    mock.onPost('/custom').reply(200, { ok: true });

    const { result } = renderHook(
      () =>
        useApiMutation((inst, vars: { x: number }) =>
          inst.post('/custom', vars).then((r) => r.data),
        ),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ x: 42 }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ ok: true });
  });

  // ── Callbacks ────────────────────────────────────────────────────────────────

  it('calls onSuccess with data and variables', async () => {
    mock.onPost('/users').reply(201, { id: 11 });
    const onSuccess = vi.fn();

    const { result } = renderHook(
      () => useApiMutation('/users', { onSuccess }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: 'Eve' }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
    expect(onSuccess).toHaveBeenCalledWith({ id: 11 }, { name: 'Eve' });
  });

  // ── Error paths ──────────────────────────────────────────────────────────────

  it('normalizes HTTP errors and calls onError', async () => {
    mock.onPost('/users').reply(422, { message: 'Validation failed' });
    const onError = vi.fn();

    const { result } = renderHook(
      () => useApiMutation('/users', { onError }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: '' }));
    await waitFor(() => expect(result.current.isError).toBe(true));
    const error = result.current.error as ApiError;
    expect(error.status).toBe(422);
    expect(error.message).toBe('Validation failed');
    expect(onError).toHaveBeenCalledWith(error);
  });

  it('normalizes a plain Error thrown by a custom function', async () => {
    const { result } = renderHook(
      () =>
        useApiMutation((_inst, _vars: unknown) => {
          throw new Error('Something exploded');
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate(null));
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.status).toBe(-1);
    expect(result.current.error?.message).toBe('Something exploded');
  });

  it('normalizes a thrown string by a custom function', async () => {
    const { result } = renderHook(
      () =>
        useApiMutation((_inst, _vars: unknown) => {
          throw 'raw string error';
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate(null));
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.status).toBe(-1);
    expect(result.current.error?.message).toBe('raw string error');
  });

  // ── Cache invalidation ────────────────────────────────────────────────────────

  it('invalidates query keys on success', async () => {
    queryClient.setQueryData(['/users'], [{ id: 1 }]);
    mock.onPost('/users').reply(201, { id: 12 });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useApiMutation('/users', { invalidates: [['/users']] }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: 'Frank' }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['/users'] });
  });

  // ── Optimistic updates ────────────────────────────────────────────────────────

  it('applies optimistic update then rolls back on error', async () => {
    queryClient.setQueryData(['/users'], [{ id: 1, name: 'Alice' }]);
    // Delayed reply so we can observe the intermediate optimistic state
    mock.onPost('/users').reply(
      () =>
        new Promise<[number, { message: string }]>((resolve) =>
          setTimeout(() => resolve([500, { message: 'Server error' }]), 80),
        ),
    );

    const { result } = renderHook(
      () =>
        useApiMutation<{ id: number; name: string }[], { name: string }>('/users', {
          optimistic: {
            queryKey: ['/users'],
            updater: (old, newUser) => [...(old ?? []), { id: 999, ...newUser }],
          },
        }),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: 'Ghost' }));

    await waitFor(() =>
      expect(queryClient.getQueryData(['/users'])).toEqual([
        { id: 1, name: 'Alice' },
        { id: 999, name: 'Ghost' },
      ]),
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(queryClient.getQueryData(['/users'])).toEqual([{ id: 1, name: 'Alice' }]);
  });

  // ── reset ────────────────────────────────────────────────────────────────────

  it('reset() clears mutation state back to idle', async () => {
    mock.onPost('/users').reply(201, { id: 99 });

    const { result } = renderHook(
      () => useApiMutation('/users'),
      { wrapper: makeWrapper(queryClient, apiClient) },
    );

    act(() => result.current.mutate({ name: 'X' }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    act(() => result.current.reset());
    expect(result.current.data).toBeUndefined();
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
