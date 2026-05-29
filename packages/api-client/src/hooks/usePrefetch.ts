import { useCallback } from 'react';
import { useApiContext } from '../provider';

export function usePrefetch<TData = unknown>(
  url: string,
  options?: { staleTime?: number },
): () => void {
  const { apiClient, queryClient } = useApiContext();

  const prefetch = useCallback(() => {
    void queryClient.prefetchQuery<TData>({
      queryKey: [url],
      queryFn: () => apiClient.instance.get<TData>(url).then((r) => r.data),
      staleTime: options?.staleTime,
    });
  }, [url, queryClient, apiClient, options?.staleTime]);

  return prefetch;
}
