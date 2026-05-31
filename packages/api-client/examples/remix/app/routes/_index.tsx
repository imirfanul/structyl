/**
 * Remix loader prefetch
 *
 * The Remix loader runs on the server, prefetches data, and passes the
 * dehydrated state to the client for hydration.
 */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { createApiClient } from '@structyl/api-client';
import { prefetchApiQuery } from '@structyl/api-client/server';
import { useApiQuery } from '@structyl/api-client';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export async function loader() {
  const queryClient = new QueryClient();
  const api = createApiClient({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
  await prefetchApiQuery(queryClient, api, '/todos?_limit=5');
  return json({ dehydratedState: dehydrate(queryClient) });
}

function Todos() {
  const { data, isLoading, error } = useApiQuery<Todo[]>('/todos?_limit=5');
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <ul>
      {data?.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}

export default function Index() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Todos />
    </HydrationBoundary>
  );
}
