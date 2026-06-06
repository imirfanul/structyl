'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@structyl/utils';

// ── Variants ─────────────────────────────────────────────────────────────────

export const descriptionListVariants = tv({
  base: 'text-sm',
  variants: {
    orientation: {
      /** Term above details, stacked. */
      vertical: 'space-y-4',
      /** Term and details side-by-side in a two-column grid. */
      horizontal: 'grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-4 gap-y-3',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

interface DescriptionListContextValue {
  orientation: 'vertical' | 'horizontal';
}
const DescriptionListContext = React.createContext<DescriptionListContextValue>({
  orientation: 'horizontal',
});

// ── Root ──────────────────────────────────────────────────────────────────────

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement>,
    VariantProps<typeof descriptionListVariants> {}

const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, orientation = 'horizontal', children, ...props }, ref) => (
    <DescriptionListContext.Provider value={{ orientation: orientation ?? 'horizontal' }}>
      <dl ref={ref} className={cn(descriptionListVariants({ orientation }), className)} {...props}>
        {children}
      </dl>
    </DescriptionListContext.Provider>
  ),
);
DescriptionList.displayName = 'DescriptionList';

// ── Term ───────────────────────────────────────────────────────────────────────

export interface DescriptionTermProps extends React.HTMLAttributes<HTMLElement> {}

const DescriptionTerm = React.forwardRef<HTMLElement, DescriptionTermProps>(
  ({ className, ...props }, ref) => (
    <dt
      ref={ref as React.Ref<HTMLElement>}
      className={cn('font-medium text-muted-foreground', className)}
      {...props}
    />
  ),
);
DescriptionTerm.displayName = 'DescriptionTerm';

// ── Details ────────────────────────────────────────────────────────────────────

export interface DescriptionDetailsProps extends React.HTMLAttributes<HTMLElement> {}

const DescriptionDetails = React.forwardRef<HTMLElement, DescriptionDetailsProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = React.useContext(DescriptionListContext);
    return (
      <dd
        ref={ref as React.Ref<HTMLElement>}
        className={cn('text-fg', orientation === 'vertical' && 'mt-1', className)}
        {...props}
      />
    );
  },
);
DescriptionDetails.displayName = 'DescriptionDetails';

// ── Compound export ─────────────────────────────────────────────────────────────

const DescriptionListNamespace = Object.assign(DescriptionList, {
  Term: DescriptionTerm,
  Details: DescriptionDetails,
});

export {
  DescriptionListNamespace as DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
};
