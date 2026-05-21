import { useEffect } from 'react';

export function useMount(callback: () => void): void {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
