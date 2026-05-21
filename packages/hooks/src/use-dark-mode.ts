import { useMediaQuery } from './use-media-query';

export function useDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
