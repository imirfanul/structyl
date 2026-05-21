import { useCallback, useState } from 'react';

export function useCopyToClipboard(): {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  reset: () => void;
} {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }, []);

  const reset = useCallback(() => setCopied(false), []);

  return { copy, copied, reset };
}
