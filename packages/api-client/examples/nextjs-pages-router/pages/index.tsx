/**
 * Next.js Pages Router — getServerSideProps prefetch
 *
 * Data is fetched on the server, dehydrated, and passed as a prop so the
 * client QueryClient can hydrate it via HydrationBoundary.
 */
import React from 'react';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { createApiClient } from '@aura-ui/api-client';
import { prefetchApiQuery } from '@aura-ui/api-client/server';
import { useApiQuery } from '@aura-ui/api-client';
import type { GetServerSideProps } from 'next';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface PageProps {
  dehydratedState: unknown;
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

function Page({ dehydratedState }: PageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Todos />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const queryClient = new QueryClient();
  const api = createApiClient({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  await prefetchApiQuery(queryClient, api, '/todos?_limit=5');

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Page;
