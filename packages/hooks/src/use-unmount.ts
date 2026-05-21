import { useEffect } from 'react';
import { useLatest } from './use-latest';

export function useUnmount(callback: () => void): void {
  const cbRef = useLatest(callback);
  useEffect(() => () => cbRef.current?.(), [cbRef]);
}
