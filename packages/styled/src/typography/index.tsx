'use client';

import * as React from 'react';
import { Slot } from '@aura-ui/core';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Variants ──────────────────────────────────────────────────────────────────

export const typographyVariants = tv({
  base: 'text-fg',
  variants: {
    variant: {
      h1: 'text-variant-h1',
      h2: 'text-variant-h2',
      h3: 'text-variant-h3',
      h4: 'text-variant-h4',
      h5: 'text-variant-h5',
      h6: 'text-variant-h6',
      subtitle1: 'text-variant-subtitle1',
      subtitle2: 'text-variant-subtitle2',
      body1: 'text-variant-body1',
      body2: 'text-variant-body2',
      body3: 'text-variant-body3',
      caption: 'text-variant-caption',
      overline: 'text-variant-overline',
      'badge-label': 'text-variant-badge-label',
      'button-lg': 'text-variant-button-lg',
      'button-md': 'text-variant-button-md',
      'button-sm': 'text-variant-button-sm',
      'input-label': 'text-variant-input-label',
      'helper-text': 'text-variant-helper-text',
      'table-header': 'text-variant-table-header',
      'tab-label': 'text-variant-tab-label',
      tooltip: 'text-variant-tooltip',
      code: 'text-variant-code',
      lead: 'text-variant-lead',
      // ── Convenience aliases ──────────────────────────────────────────────
      body: 'text-variant-body1',
      small: 'text-variant-body2',
      muted: 'text-variant-body2 text-muted-foreground',
    },
    color: {
      inherit: 'text-inherit',
      primary: 'text-primary',
      secondary: 'text-fg-secondary',
      muted: 'text-muted-foreground',
      disabled: 'text-fg-disabled',
      error: 'text-destructive',
      warning: 'text-warning',
      info: 'text-info',
      success: 'text-success',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    truncate: {
      true: 'truncate',
    },
    noWrap: {
      true: 'whitespace-nowrap',
    },
    gutterBottom: {
      true: 'mb-3',
    },
    paragraph: {
      true: 'mb-4',
    },
  },
  defaultVariants: { variant: 'body1' },
});

// ── Default element per variant ───────────────────────────────────────────────

const defaultElementMap: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  body: 'p',
  small: 'p',
  muted: 'p',
  lead: 'p',
  caption: 'span',
  overline: 'span',
  'badge-label': 'span',
  'button-lg': 'span',
  'button-md': 'span',
  'button-sm': 'span',
  'helper-text': 'span',
  'table-header': 'span',
  'tab-label': 'span',
  tooltip: 'span',
  'input-label': 'label',
  code: 'code',
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;
export type TypographyColor = NonNullable<VariantProps<typeof typographyVariants>['color']>;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /** Override the rendered element */
  as?: React.ElementType;
  /** Render as child element instead (Slot pattern) */
  asChild?: boolean;
  /** Add a bottom margin (0.75rem) */
  gutterBottom?: boolean;
  /** Add paragraph bottom margin (1rem) */
  paragraph?: boolean;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Associates the label with a form control (for use with as="label") */
  htmlFor?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'body1',
      color,
      truncate,
      noWrap,
      gutterBottom,
      paragraph,
      align,
      as,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : (as ?? defaultElementMap[variant as string] ?? 'span');

    return (
      <Comp
        ref={ref}
        className={cn(
          typographyVariants({ variant, color, truncate, noWrap, gutterBottom, paragraph, align }),
          className,
        )}
        {...props}
      />
    );
  },
);
Typography.displayName = 'Typography';

export { Typography };
