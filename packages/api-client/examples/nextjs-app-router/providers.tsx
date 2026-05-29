'use client';

import React from 'react';
import { createApiClient, ApiProvider } from '@aura-ui/api-client';

const api = createApiClient({
  baseURL: process.env['NEXT_PUBLIC_API_URL']!,
  getAuthToken: () =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApiProvider client={api}>{children}</ApiProvider>;
}
