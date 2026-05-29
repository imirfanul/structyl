'use client';

import React from 'react';
import { useApiQuery } from '@aura-ui/api-client';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function TodoList() {
  const { data, isLoading, error } = useApiQuery<Todo[]>('/todos?_limit=5');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((t) => (
        <li
          key={t.id}
          style={{ textDecoration: t.completed ? 'line-through' : 'none' }}
        >
          {t.title}
        </li>
      ))}
    </ul>
  );
}
