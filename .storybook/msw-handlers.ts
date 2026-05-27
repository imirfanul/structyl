// MSW handlers for Storybook stories.
// This library has no network calls during render — file kept minimal.
// Add component-specific handlers here if a story exercises an async data flow.
import { http, HttpResponse } from 'msw';

export const mswHandlers = {
  // Example — not exercised yet:
  // fileUpload: [
  //   http.post('/api/upload', () => HttpResponse.json({ url: 'https://example.com/file.png' })),
  // ],
};
