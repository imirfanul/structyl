import { useCallback, useRef, useState } from 'react';
import type { AxiosInstance } from 'axios';
import { useApiContext } from '../provider';
import type { ApiError, UseApiMutationOptions, ApiMutationResult } from '../types';
import { toApiError } from '../utils';

type MutationFn<TData, TVariables> = (
  instance: AxiosInstance,
  variables: TVariables,
) => Promise<TData>;

type MutationStatus = 'idle' | 'pending' | 'success' | 'error';

interface MutationState<TData> {
  data: TData | undefined;
  error: ApiError | null;
  status: MutationStatus;
}

export function useApiMutation<TData = unknown, TVariables = unknown>(
  urlOrFn: string | MutationFn<TData, TVariables>,
  options?: UseApiMutationOptions<TData, TVariables>,
): ApiMutationResult<TData, TVariables> {
  const { apiClient, queryClient } = useApiContext();
  // Always read the latest options without requiring them in useCallback deps
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [state, setState] = useState<MutationState<TData>>({
    data: undefined,
    error: null,
    status: 'idle',
  });

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      const { method = 'POST', onSuccess, onError, invalidates, optimistic, onUploadProgress } =
        optionsRef.current ?? {};

      setState({ data: undefined, error: null, status: 'pending' });

      // Snapshot + apply optimistic update before the request fires
      let previousData: TData | undefined;
      if (optimistic) {
        await queryClient.cancelQueries({ queryKey: optimistic.queryKey });
        previousData = queryClient.getQueryData<TData>(optimistic.queryKey);
        queryClient.setQueryData<TData>(optimistic.queryKey, (old) =>
          optimistic.updater(old, variables),
        );
      }

      try {
        const data =
          typeof urlOrFn === 'function'
            ? await urlOrFn(apiClient.instance, variables)
            : await apiClient.instance
                .request<TData>({
                  method,
                  url: urlOrFn,
                  data: variables,
                  onUploadProgress:
                    onUploadProgress
                      ? (evt) => {
                          const pct = evt.total
                            ? Math.round((evt.loaded / evt.total) * 100)
                            : 0;
                          onUploadProgress(pct);
                        }
                      : undefined,
                })
                .then((r) => r.data);

        setState({ data, error: null, status: 'success' });

        if (invalidates?.length) {
          await Promise.all(
            invalidates.map((key) => queryClient.invalidateQueries({ queryKey: key })),
          );
        }

        await onSuccess?.(data, variables);
        return data;
      } catch (err) {
        // Rollback optimistic update on failure
        if (optimistic) {
          queryClient.setQueryData(optimistic.queryKey, previousData);
        }
        const apiError = toApiError(err);
        setState({ data: undefined, error: apiError, status: 'error' });
        onError?.(apiError);
        throw apiError;
      }
    },
    [apiClient, queryClient, urlOrFn],
  );

  const mutate = useCallback(
    (variables: TVariables) => {
      // Swallow the rejection — callers observe state.error instead
      void mutateAsync(variables).catch(() => undefined);
    },
    [mutateAsync],
  );

  const reset = useCallback(() => {
    setState({ data: undefined, error: null, status: 'idle' });
  }, []);

  return {
    mutate,
    mutateAsync,
    data: state.data,
    isPending: state.status === 'pending',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    error: state.error,
    reset,
  };
}
