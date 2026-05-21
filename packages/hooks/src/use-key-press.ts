import { useEventListener } from './use-event-listener';

export function useKeyPress(targetKey: string, handler: (event: KeyboardEvent) => void): void {
  useEventListener('keydown', (event) => {
    if (event.key === targetKey) handler(event);
  });
}
