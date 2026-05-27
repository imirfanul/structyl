'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

export const kbdVariants = tv({
  base: [
    'inline-flex items-center justify-center rounded border font-mono font-medium leading-none',
    'border-border bg-muted text-muted-foreground shadow-[0_2px_0_0_hsl(var(--border))]',
    'select-none',
  ],
  variants: {
    size: {
      sm: 'min-w-[1.25rem] px-1 py-px text-[10px]',
      md: 'min-w-[1.5rem] px-1.5 py-0.5 text-xs',
      lg: 'min-w-[1.75rem] px-2 py-1 text-sm',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, ...props }, ref) => (
    <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props} />
  ),
);
Kbd.displayName = 'Kbd';

// ── KeyCombo — renders "⌘ K" or "Ctrl + K" as a row of Kbd elements ──────────

export interface KeyComboProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string[];
  size?: VariantProps<typeof kbdVariants>['size'];
}

const KeyCombo: React.FC<KeyComboProps> = ({ keys, size, className, ...props }) => (
  <span className={cn('inline-flex items-center gap-1', className)} {...props}>
    {keys.map((key, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-muted-foreground/50 text-xs" aria-hidden>+</span>}
        <Kbd size={size}>{key}</Kbd>
      </React.Fragment>
    ))}
  </span>
);
KeyCombo.displayName = 'KeyCombo';

export { Kbd, KeyCombo };
