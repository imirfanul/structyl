'use client';

import * as React from 'react';
import { Check, Copy } from '@structyl/icons';
import { cn } from '@structyl/utils';
import { buttonVariants, type ButtonProps } from '../button';

interface CopyButtonProps extends Omit<ButtonProps, 'value'> {
  value: string;
  /** Reset duration in ms. */
  resetAfter?: number;
  onCopied?: (value: string) => void;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, resetAfter = 2000, onCopied, children, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    React.useEffect(() => {
      if (!copied) return undefined;
      const t = window.setTimeout(() => setCopied(false), resetAfter);
      return () => window.clearTimeout(t);
    }, [copied, resetAfter]);
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopied?.(value);
      } catch (err) {
        void err;
      }
    };
    return (
      <button
        type="button"
        ref={ref}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        data-state={copied ? 'copied' : 'idle'}
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), className)}
        onClick={handleCopy}
        {...props}
      >
        {children ?? (copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />)}
      </button>
    );
  },
);
CopyButton.displayName = 'CopyButton';

export { CopyButton };
export type { CopyButtonProps };
