import React, { createContext, useContext, useRef } from 'react';
import type { ReactNode } from 'react';
import { QueryClient } from './cache';
import type { ApiClient } from './client';
import type { DehydratedState } from './server';
import type { QueryClientConfig } from './types';

interface ApiContextValue {
  apiClient: ApiClient;
  queryClient: QueryClient;
}

const ApiContext = createContext<ApiContextValue | null>(null);

export function useApiContext(): ApiContextValue {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error(
      '[api-client] Hooks must be used within <ApiProvider>. ' +
        'Wrap your app root with <ApiProvider client={api}>.',
    );
  }
  return ctx;
}

export function useApiClient(): ApiClient {
  return useApiContext().apiClient;
}

function makeQueryClient(config?: QueryClientConfig): QueryClient {
  return new QueryClient(config);
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient(config?: QueryClientConfig): QueryClient {
  if (typeof window === 'undefined') return makeQueryClient(config);
  if (!browserQueryClient) browserQueryClient = makeQueryClient(config);
  return browserQueryClient;
}

export interface ApiProviderProps {
  client: ApiClient;
  children: ReactNode;
  /** Inject a pre-built QueryClient (advanced / testing) */
  queryClient?: QueryClient;
  /** Override the GC time for entries with no active subscriber (ms, default 5 min) */
  gcTime?: number;
  /** Hydrate from server-prefetched state (SSR) */
  hydratedState?: DehydratedState;
  /** Global QueryClient configuration (callbacks etc.) */
  queryClientConfig?: QueryClientConfig;
}

export function ApiProvider({
  client,
  children,
  queryClient,
  gcTime,
  hydratedState,
  queryClientConfig,
}: ApiProviderProps): React.JSX.Element {
  const qcRef = useRef<QueryClient | null>(null);
  if (!qcRef.current) {
    const config: QueryClientConfig = {
      gcTime,
      ...queryClientConfig,
    };
    qcRef.current = queryClient ?? getQueryClient(config);
    if (hydratedState) {
      qcRef.current.cache.restore(hydratedState.entries);
    }
  }

  const ctxRef = useRef<ApiContextValue | null>(null);
  if (!ctxRef.current || ctxRef.current.apiClient !== client) {
    ctxRef.current = { apiClient: client, queryClient: qcRef.current };
  }

  return (
    <ApiContext.Provider value={ctxRef.current}>{children}</ApiContext.Provider>
  );
}

ApiProvider.displayName = 'ApiProvider';
