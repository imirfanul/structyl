import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    passWithNoTests: true,
    globals: true,
    environment: 'jsdom',
  },
});
