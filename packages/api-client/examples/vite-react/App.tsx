/**
 * Vite + React example
 * Shows: query, mutation, optimistic update
 *
 * Usage:
 *   npm create vite@latest my-app -- --template react-ts
 *   npm install @aura-ui/api-client @tanstack/react-query axios
 */
import React from 'react';
import {
  createApiClient,
  ApiProvider,
  useApiQuery,
  useApiMutation,
} from '@aura-ui/api-client';

const api = createApiClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  getAuthToken: () =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
});

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function TodoList() {
  const { data: todos, isLoading, error } = useApiQuery<Todo[]>('/todos?_limit=5');

  const { mutate: addTodo, isPending } = useApiMutation<
    Todo,
    { title: string }
  >('/todos', {
    method: 'POST',
    invalidates: [['/todos?_limit=5']],
    optimistic: {
      queryKey: ['/todos?_limit=5'],
      updater: (old, newTodo) => [
        ...(old ?? []),
        { id: Date.now(), title: newTodo.title, completed: false },
      ],
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {todos?.map((t) => (
          <li key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
            {t.title}
          </li>
        ))}
      </ul>
      <button disabled={isPending} onClick={() => addTodo({ title: 'New todo' })}>
        {isPending ? 'Adding...' : 'Add Todo'}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ApiProvider client={api}>
      <h1>Todos</h1>
      <TodoList />
    </ApiProvider>
  );
}
