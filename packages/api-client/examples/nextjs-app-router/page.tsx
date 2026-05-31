/**
 * Next.js App Router — server prefetch + client hydration
 *
 * The page renders on the server, prefetches data into a QueryClient,
 * dehydrates it, and passes it to the HydrationBoundary so the client
 * renders without a loading flicker.
 */
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { createApiClient } from '@structyl/api-client';
import { prefetchApiQuery, QueryClient } from '@structyl/api-client/server';
import { TodoList } from './TodoList';

export default async function Page() {
  const queryClient = new QueryClient();
  const api = createApiClient({ baseURL: process.env['API_URL']! });

  await prefetchApiQuery(queryClient, api, '/todos?_limit=5');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />
    </HydrationBoundary>
  );
}
