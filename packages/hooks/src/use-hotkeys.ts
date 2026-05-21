import { useEffect } from 'react';

type Modifier = 'ctrl' | 'meta' | 'shift' | 'alt' | 'mod';

export function useHotkeys(
  keys: string,
  handler: (event: KeyboardEvent) => void,
  options: { enableOnFormTags?: boolean; preventDefault?: boolean } = {},
): void {
  useEffect(() => {
    const { enableOnFormTags = false, preventDefault = true } = options;
    const tokens = keys.toLowerCase().split('+').map((s) => s.trim()) as (Modifier | string)[];
    const targetKey = tokens[tokens.length - 1];

    const listener = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        !enableOnFormTags &&
        target &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      ) {
        return;
      }

      const expectsCtrl = tokens.includes('ctrl');
      const expectsMeta = tokens.includes('meta');
      const expectsMod = tokens.includes('mod');
      const expectsShift = tokens.includes('shift');
      const expectsAlt = tokens.includes('alt');

      const isMacLike =
        typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const modOk = expectsMod ? (isMacLike ? event.metaKey : event.ctrlKey) : true;

      if (
        event.key.toLowerCase() === targetKey &&
        (expectsCtrl ? event.ctrlKey : !expectsMod || !event.ctrlKey || isMacLike) &&
        (expectsMeta ? event.metaKey : !expectsMod || !event.metaKey || !isMacLike) &&
        modOk &&
        (expectsShift ? event.shiftKey : !event.shiftKey || expectsShift) &&
        (expectsAlt ? event.altKey : !event.altKey || expectsAlt)
      ) {
        if (preventDefault) event.preventDefault();
        handler(event);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [keys, handler, options]);
}
