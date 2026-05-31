'use client';

import * as React from 'react';
import { Check, ChevronsRight, ChevronsLeft, Plus, X } from '@structyl/icons';
import { Structyl as StructylPrimitive } from '@structyl/primitives';
import type {
  StructylRatingProps as PrimitiveRatingProps,
  StructylSnackbarProps as PrimitiveSnackbarProps,
  StructylTransferListProps as PrimitiveTransferListProps,
  PopperProps,
  StructylTransitionProps as PrimitiveTransitionProps,
} from '@structyl/primitives';
import { cn } from '@structyl/utils';
import { buttonVariants, type ButtonProps } from '../button';
import * as Combobox from '../combobox';

type StructylColor =
  | 'default'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'muted'
  | 'transparent';
type StructylSize = 'small' | 'medium' | 'large';
type StructylSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
type ContainerMaxWidth = false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type GridSize = 'auto' | 'grow' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type StructylButtonVariant = 'contained' | 'outlined' | 'text';
type StructylUiButtonVariant = NonNullable<ButtonProps['variant']>;
type StructylButtonSize = NonNullable<ButtonProps['size']>;

const gapClasses: Record<StructylSpacing, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
};

const rowGapClasses: Record<StructylSpacing, string> = {
  0: 'gap-y-0',
  1: 'gap-y-1',
  2: 'gap-y-2',
  3: 'gap-y-3',
  4: 'gap-y-4',
  5: 'gap-y-5',
  6: 'gap-y-6',
  8: 'gap-y-8',
};

const columnGapClasses: Record<StructylSpacing, string> = {
  0: 'gap-x-0',
  1: 'gap-x-1',
  2: 'gap-x-2',
  3: 'gap-x-3',
  4: 'gap-x-4',
  5: 'gap-x-5',
  6: 'gap-x-6',
  8: 'gap-x-8',
};

const paddingClasses: Record<StructylSpacing, string> = {
  0: 'p-0',
  1: 'p-1',
  2: 'p-2',
  3: 'p-3',
  4: 'p-4',
  5: 'p-5',
  6: 'p-6',
  8: 'p-8',
};

const marginClasses: Record<StructylSpacing, string> = {
  0: 'm-0',
  1: 'm-1',
  2: 'm-2',
  3: 'm-3',
  4: 'm-4',
  5: 'm-5',
  6: 'm-6',
  8: 'm-8',
};

const maxWidthClasses: Record<Exclude<ContainerMaxWidth, false>, string> = {
  xs: 'max-w-screen-sm',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-none',
};

const gridColumnsClasses: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

const gridSpanClasses: Record<Exclude<GridSize, 'auto' | 'grow'>, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

const smGridSpanClasses: Record<Exclude<GridSize, 'auto' | 'grow'>, string> = {
  1: 'sm:col-span-1',
  2: 'sm:col-span-2',
  3: 'sm:col-span-3',
  4: 'sm:col-span-4',
  5: 'sm:col-span-5',
  6: 'sm:col-span-6',
  7: 'sm:col-span-7',
  8: 'sm:col-span-8',
  9: 'sm:col-span-9',
  10: 'sm:col-span-10',
  11: 'sm:col-span-11',
  12: 'sm:col-span-12',
};

const mdGridSpanClasses: Record<Exclude<GridSize, 'auto' | 'grow'>, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
};

const lgGridSpanClasses: Record<Exclude<GridSize, 'auto' | 'grow'>, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
};

const xlGridSpanClasses: Record<Exclude<GridSize, 'auto' | 'grow'>, string> = {
  1: 'xl:col-span-1',
  2: 'xl:col-span-2',
  3: 'xl:col-span-3',
  4: 'xl:col-span-4',
  5: 'xl:col-span-5',
  6: 'xl:col-span-6',
  7: 'xl:col-span-7',
  8: 'xl:col-span-8',
  9: 'xl:col-span-9',
  10: 'xl:col-span-10',
  11: 'xl:col-span-11',
  12: 'xl:col-span-12',
};

const gridResponsiveSpanClasses = {
  sm: smGridSpanClasses,
  md: mdGridSpanClasses,
  lg: lgGridSpanClasses,
  xl: xlGridSpanClasses,
};

function getResponsiveGridSpan(
  breakpoint: keyof typeof gridResponsiveSpanClasses,
  size?: GridSize,
) {
  if (typeof size === 'number') return gridResponsiveSpanClasses[breakpoint][size];
  if (size === 'auto') {
    if (breakpoint === 'sm') return 'sm:col-auto';
    if (breakpoint === 'md') return 'md:col-auto';
    if (breakpoint === 'lg') return 'lg:col-auto';
    return 'xl:col-auto';
  }
  if (size === 'grow') {
    if (breakpoint === 'sm') return 'sm:col-span-full';
    if (breakpoint === 'md') return 'md:col-span-full';
    if (breakpoint === 'lg') return 'lg:col-span-full';
    return 'xl:col-span-full';
  }
  return undefined;
}

const textColorClasses: Record<StructylColor, string> = {
  default: 'text-fg',
  inherit: 'text-inherit',
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  muted: 'text-muted-foreground',
  transparent: 'text-transparent',
};

const surfaceColorClasses: Record<StructylColor, string> = {
  default: 'bg-bg text-fg',
  inherit: 'bg-inherit text-inherit',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  muted: 'bg-muted text-muted-foreground',
  transparent: 'bg-transparent text-fg',
};

const chipOutlineColorClasses: Record<Exclude<StructylColor, 'inherit' | 'transparent'>, string> = {
  default: 'border-border bg-bg text-fg',
  primary: 'border-primary text-primary',
  secondary: 'border-secondary text-secondary-foreground',
  success: 'border-success text-success',
  warning: 'border-warning text-warning',
  destructive: 'border-destructive text-destructive',
  muted: 'border-border text-muted-foreground',
};

const elevationClasses: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, string> = {
  0: 'shadow-none',
  1: 'shadow-sm',
  2: 'shadow-md',
  3: 'shadow-lg',
  4: 'shadow-xl',
  5: 'shadow-2xl',
  6: 'shadow-overlay',
};

function getButtonVariant(
  variant: StructylButtonVariant = 'contained',
  color: StructylColor = 'primary',
): StructylUiButtonVariant {
  if (variant === 'outlined') return 'outline';
  if (variant === 'text') return color === 'primary' ? 'link' : 'ghost';
  if (color === 'secondary' || color === 'muted') return 'secondary';
  if (color === 'destructive') return 'destructive';
  return 'default';
}

function getButtonSize(size: StructylSize = 'medium'): StructylButtonSize {
  if (size === 'small') return 'sm';
  if (size === 'large') return 'lg';
  return 'default';
}

const Box = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Box>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Box> & {
    display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'contents';
    padding?: StructylSpacing;
    margin?: StructylSpacing;
  }
>(({ className, display, padding, margin, ...props }, ref) => (
  <StructylPrimitive.Box
    ref={ref}
    className={cn(
      display === 'block' && 'block',
      display === 'inline' && 'inline',
      display === 'inline-block' && 'inline-block',
      display === 'flex' && 'flex',
      display === 'inline-flex' && 'inline-flex',
      display === 'grid' && 'grid',
      display === 'contents' && 'contents',
      padding !== undefined && paddingClasses[padding],
      margin !== undefined && marginClasses[margin],
      className,
    )}
    {...props}
  />
));
Box.displayName = 'Box';

const Container = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Container>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Container> & {
    size?: Exclude<ContainerMaxWidth, false>;
    maxWidth?: ContainerMaxWidth;
    disableGutters?: boolean;
    fixed?: boolean;
  }
>(({ className, size, maxWidth, disableGutters = false, fixed = false, ...props }, ref) => {
  const resolvedMaxWidth = maxWidth ?? size ?? 'lg';
  return (
    <StructylPrimitive.Container
      ref={ref}
      className={cn(
        'mx-auto w-full',
        !disableGutters && 'px-4 sm:px-6 lg:px-8',
        resolvedMaxWidth === false ? 'max-w-none' : maxWidthClasses[resolvedMaxWidth],
        fixed && 'sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl',
        className,
      )}
      {...props}
    />
  );
});
Container.displayName = 'Container';

const Stack = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Stack>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Stack> & {
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | StructylSpacing;
    divider?: React.ReactNode;
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  }
>(
  (
    {
      className,
      direction = 'column',
      spacing = 'md',
      divider,
      alignItems,
      justifyContent,
      flexWrap,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedSpacing =
      typeof spacing === 'number'
        ? gapClasses[spacing]
        : spacing === 'xs'
          ? 'gap-1'
          : spacing === 'sm'
            ? 'gap-2'
            : spacing === 'lg'
              ? 'gap-6'
              : spacing === 'none'
                ? 'gap-0'
                : 'gap-4';
    const content = divider
      ? React.Children.toArray(children).flatMap((child, index, array) =>
          index < array.length - 1
            ? [
                child,
                React.cloneElement(divider as React.ReactElement, { key: `divider-${index}` }),
              ]
            : [child],
        )
      : children;

    return (
      <StructylPrimitive.Stack
        ref={ref}
        className={cn(
          'flex',
          direction === 'row' && 'flex-row',
          direction === 'row-reverse' && 'flex-row-reverse',
          direction === 'column' && 'flex-col',
          direction === 'column-reverse' && 'flex-col-reverse',
          resolvedSpacing,
          alignItems === 'start' && 'items-start',
          alignItems === 'center' && 'items-center',
          alignItems === 'end' && 'items-end',
          alignItems === 'stretch' && 'items-stretch',
          alignItems === 'baseline' && 'items-baseline',
          justifyContent === 'start' && 'justify-start',
          justifyContent === 'center' && 'justify-center',
          justifyContent === 'end' && 'justify-end',
          justifyContent === 'between' && 'justify-between',
          justifyContent === 'around' && 'justify-around',
          justifyContent === 'evenly' && 'justify-evenly',
          flexWrap === 'nowrap' && 'flex-nowrap',
          flexWrap === 'wrap' && 'flex-wrap',
          flexWrap === 'wrap-reverse' && 'flex-wrap-reverse',
          className,
        )}
        {...props}
      >
        {content}
      </StructylPrimitive.Stack>
    );
  },
);
Stack.displayName = 'Stack';

const Grid = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Grid>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Grid> & {
    container?: boolean;
    item?: boolean;
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    spacing?: StructylSpacing;
    rowSpacing?: StructylSpacing;
    columnSpacing?: StructylSpacing;
    gap?: 'none' | 'sm' | 'md' | 'lg' | StructylSpacing;
    size?: GridSize;
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
  }
>(
  (
    {
      className,
      container = true,
      item,
      columns = 12,
      spacing,
      rowSpacing,
      columnSpacing,
      gap = spacing ?? 'md',
      size,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    void item;
    const resolvedGap =
      typeof gap === 'number'
        ? gapClasses[gap]
        : gap === 'none'
          ? 'gap-0'
          : gap === 'sm'
            ? 'gap-2'
            : gap === 'lg'
              ? 'gap-6'
              : 'gap-4';
    const span = size ?? xs;
    return (
      <StructylPrimitive.Grid
        ref={ref}
        className={cn(
          container && 'grid',
          container && gridColumnsClasses[columns],
          resolvedGap,
          rowSpacing !== undefined && rowGapClasses[rowSpacing],
          columnSpacing !== undefined && columnGapClasses[columnSpacing],
          span === 'auto' && 'col-auto',
          span === 'grow' && 'col-span-full',
          typeof span === 'number' && gridSpanClasses[span],
          getResponsiveGridSpan('sm', sm),
          getResponsiveGridSpan('md', md),
          getResponsiveGridSpan('lg', lg),
          getResponsiveGridSpan('xl', xl),
          className,
        )}
        {...props}
      />
    );
  },
);
Grid.displayName = 'Grid';

const Paper = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Paper>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Paper> & {
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    variant?: 'elevation' | 'outlined';
    square?: boolean;
  }
>(({ className, elevation = 1, variant = 'elevation', square = false, ...props }, ref) => (
  <StructylPrimitive.Paper
    ref={ref}
    className={cn(
      'bg-card text-card-foreground border',
      square ? 'rounded-none' : 'rounded-lg',
      variant === 'outlined' ? 'border-border shadow-none' : 'border-transparent',
      variant === 'elevation' && elevationClasses[elevation],
      className,
    )}
    {...props}
  />
));
Paper.displayName = 'Paper';

const Typography = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Typography>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Typography> & {
    variant?:
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'subtitle1'
      | 'subtitle2'
      | 'body1'
      | 'body2'
      | 'body'
      | 'small'
      | 'caption'
      | 'button'
      | 'overline'
      | 'muted'
      | 'code';
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    color?: StructylColor;
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
  }
>(
  (
    {
      className,
      variant = 'body',
      align,
      color = 'default',
      gutterBottom = false,
      noWrap = false,
      paragraph = false,
      ...props
    },
    ref,
  ) => (
    <StructylPrimitive.Typography
      ref={ref}
      className={cn(
        variant === 'h1' && 'text-4xl font-semibold tracking-tight',
        variant === 'h2' && 'text-3xl font-semibold tracking-tight',
        variant === 'h3' && 'text-2xl font-semibold tracking-tight',
        variant === 'h4' && 'text-xl font-semibold tracking-tight',
        variant === 'h5' && 'text-lg font-semibold tracking-tight',
        variant === 'h6' && 'text-base font-semibold tracking-tight',
        variant === 'subtitle1' && 'text-base font-medium',
        variant === 'subtitle2' && 'text-sm font-medium',
        (variant === 'body' || variant === 'body1') && 'text-sm',
        variant === 'body2' && 'text-xs',
        variant === 'small' && 'text-xs',
        variant === 'caption' && 'text-xs',
        variant === 'button' && 'text-sm font-medium uppercase',
        variant === 'overline' && 'text-xs font-semibold uppercase tracking-widest',
        variant === 'muted' && 'text-muted-foreground text-sm',
        variant === 'code' && 'bg-muted rounded px-1 py-0.5 font-mono text-xs',
        variant !== 'muted' && variant !== 'code' && textColorClasses[color],
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'justify' && 'text-justify',
        gutterBottom && 'mb-2',
        paragraph && 'mb-4 block',
        noWrap && 'block truncate',
        className,
      )}
      {...props}
    />
  ),
);
Typography.displayName = 'Typography';

const Link = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Link> & {
    underline?: 'always' | 'hover' | 'none';
    color?: StructylColor;
    variant?: React.ComponentPropsWithoutRef<typeof Typography>['variant'];
  }
>(({ className, underline = 'hover', color = 'primary', variant, ...props }, ref) => (
  <StructylPrimitive.Link
    ref={ref}
    className={cn(
      'focus-visible:ring-ring/40 underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2',
      textColorClasses[color],
      underline === 'always' && 'underline',
      underline === 'hover' && 'hover:underline',
      underline === 'none' && 'no-underline',
      variant === 'body2' && 'text-xs',
      variant === 'button' && 'text-sm font-medium uppercase',
      variant === 'caption' && 'text-xs',
      className,
    )}
    {...props}
  />
));
Link.displayName = 'Link';

const SvgIcon = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.SvgIcon>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.SvgIcon> & {
    color?: StructylColor;
    fontSize?: 'inherit' | StructylSize;
    titleAccess?: string;
  }
>(({ className, color = 'inherit', fontSize = 'medium', titleAccess, title, ...props }, ref) => (
  <StructylPrimitive.SvgIcon
    ref={ref}
    title={title ?? titleAccess}
    className={cn(
      'shrink-0 fill-current',
      fontSize === 'inherit' && 'size-[1em]',
      fontSize === 'small' && 'size-4',
      fontSize === 'medium' && 'size-5',
      fontSize === 'large' && 'size-7',
      textColorClasses[color],
      className,
    )}
    {...props}
  />
));
SvgIcon.displayName = 'SvgIcon';

const Chart = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Chart>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Chart>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Chart
    ref={ref}
    className={cn(
      'text-primary border-border bg-card h-36 w-full rounded-md border p-3',
      className,
    )}
    {...props}
  />
));
Chart.displayName = 'Chart';

interface ChipProps extends React.ComponentPropsWithoutRef<typeof StructylPrimitive.ChipRoot> {
  label?: React.ReactNode;
  onDelete?: () => void;
  deleteIcon?: React.ReactNode;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'default' | 'secondary' | 'outline';
  color?: Exclude<StructylColor, 'inherit' | 'transparent'>;
  size?: Exclude<StructylSize, 'large'>;
  clickable?: boolean;
  disabled?: boolean;
}

const Chip = React.forwardRef<React.ElementRef<typeof StructylPrimitive.ChipRoot>, ChipProps>(
  (
    {
      className,
      label,
      children,
      onDelete,
      deleteIcon,
      icon,
      avatar,
      variant = 'filled',
      color = 'default',
      size = 'medium',
      clickable = false,
      disabled = false,
      tabIndex,
      ...props
    },
    ref,
  ) => (
    <StructylPrimitive.ChipRoot
      ref={ref}
      role={clickable ? 'button' : props.role}
      tabIndex={clickable && !disabled ? (tabIndex ?? 0) : tabIndex}
      data-clickable={clickable ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      className={cn(
        'inline-flex max-w-full items-center gap-1 rounded-full border font-medium transition-colors',
        'focus-visible:ring-ring/40 focus-visible:outline-none focus-visible:ring-2',
        clickable && 'cursor-pointer hover:brightness-95',
        disabled && 'pointer-events-none opacity-50',
        size === 'small' ? 'h-6 px-2 text-[11px]' : 'h-7 px-2.5 text-xs',
        (variant === 'outlined' || variant === 'outline') && chipOutlineColorClasses[color],
        (variant === 'filled' || variant === 'default' || variant === 'secondary') &&
          color === 'default' &&
          'bg-muted text-fg border-transparent',
        (variant === 'filled' || variant === 'default') &&
          color !== 'default' &&
          `border-transparent ${surfaceColorClasses[color]}`,
        variant === 'secondary' && 'bg-secondary text-secondary-foreground border-transparent',
        className,
      )}
      {...props}
    >
      {avatar ? <span className="-ml-1 inline-flex shrink-0">{avatar}</span> : null}
      {icon ? <span className="inline-flex shrink-0">{icon}</span> : null}
      <StructylPrimitive.ChipLabel className="truncate">
        {label ?? children}
      </StructylPrimitive.ChipLabel>
      {onDelete ? (
        <StructylPrimitive.ChipDelete
          aria-label="Remove"
          disabled={disabled}
          className="focus-visible:ring-ring rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2"
          onClick={onDelete}
        >
          {deleteIcon ?? <X className="size-3" />}
        </StructylPrimitive.ChipDelete>
      ) : null}
    </StructylPrimitive.ChipRoot>
  ),
);
Chip.displayName = 'Chip';

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.ButtonGroup>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.ButtonGroup> & {
    orientation?: 'horizontal' | 'vertical';
    variant?: StructylButtonVariant;
    color?: StructylColor;
    size?: StructylSize;
    disabled?: boolean;
    fullWidth?: boolean;
  }
>(
  (
    {
      className,
      orientation = 'horizontal',
      variant = 'outlined',
      color = 'default',
      size = 'medium',
      disabled,
      fullWidth,
      children,
      ...props
    },
    ref,
  ) => {
    const childVariant = getButtonVariant(variant, color);
    const childSize = getButtonSize(size);
    const content = React.Children.map(children, (child) => {
      if (!React.isValidElement<ButtonProps>(child)) return child;
      return React.cloneElement(child, {
        variant: child.props.variant ?? childVariant,
        size: child.props.size ?? childSize,
        disabled: disabled ?? child.props.disabled,
        className: cn(fullWidth && 'flex-1', child.props.className),
      });
    });

    return (
      <StructylPrimitive.ButtonGroup
        ref={ref}
        className={cn(
          'border-border shadow-xs inline-flex overflow-hidden rounded-md border',
          fullWidth && 'w-full',
          orientation === 'vertical' && 'flex-col',
          '[&>*]:rounded-none [&>*]:border-0',
          orientation === 'horizontal' && '[&>*+*]:border-border [&>*+*]:border-l',
          orientation === 'vertical' && '[&>*+*]:border-border [&>*+*]:border-t',
          className,
        )}
        {...props}
      >
        {content}
      </StructylPrimitive.ButtonGroup>
    );
  },
);
ButtonGroup.displayName = 'ButtonGroup';

interface FloatingActionButtonProps extends Omit<ButtonProps, 'size' | 'variant' | 'color'> {
  extended?: boolean;
  variant?: 'circular' | 'extended';
  color?: StructylColor;
  size?: StructylSize;
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  (
    { className, extended, variant = 'circular', color = 'primary', size = 'medium', ...props },
    ref,
  ) => {
    const isExtended = extended ?? variant === 'extended';
    const buttonSize: StructylButtonSize = isExtended
      ? getButtonSize(size)
      : size === 'small'
        ? 'icon-sm'
        : size === 'large'
          ? 'icon-lg'
          : 'icon';
    return (
      <StructylPrimitive.FloatingActionButton
        ref={ref}
        className={cn(
          buttonVariants({ variant: getButtonVariant('contained', color), size: buttonSize }),
          'rounded-full shadow-lg',
          isExtended && 'px-5',
          className,
        )}
        {...props}
      />
    );
  },
);
FloatingActionButton.displayName = 'FloatingActionButton';

const Fab = FloatingActionButton;

const Rating = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Rating>,
  PrimitiveRatingProps & {
    size?: StructylSize;
    color?: Exclude<StructylColor, 'inherit' | 'transparent'>;
    precision?: number;
  }
>(({ className, itemClassName, size = 'medium', color = 'primary', precision, ...props }, ref) => (
  <StructylPrimitive.Rating
    ref={ref}
    className={cn('inline-flex items-center gap-0.5', className)}
    itemClassName={cn(
      'text-muted-foreground inline-flex items-center justify-center rounded transition-colors',
      'hover:text-primary data-[state=checked]:text-primary',
      size === 'small' && 'size-5 text-base',
      size === 'medium' && 'size-6 text-lg',
      size === 'large' && 'size-8 text-2xl',
      color === 'success' && 'hover:text-success data-[state=checked]:text-success',
      color === 'warning' && 'hover:text-warning data-[state=checked]:text-warning',
      color === 'destructive' && 'hover:text-destructive data-[state=checked]:text-destructive',
      'focus-visible:ring-ring/40 focus-visible:outline-none focus-visible:ring-2',
      itemClassName,
    )}
    data-precision={precision}
    {...props}
  />
));
Rating.displayName = 'Rating';

const Autocomplete = Combobox;

const TransferList = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.TransferList>,
  PrimitiveTransferListProps
>(({ className, ...props }, ref) => (
  <StructylPrimitive.TransferList
    ref={ref}
    className={cn(
      'grid max-w-xl grid-cols-[1fr_auto_1fr] items-center gap-3',
      '[&_[data-transfer-list-panel]]:border-border [&_[data-transfer-list-panel]]:overflow-hidden [&_[data-transfer-list-panel]]:rounded-md [&_[data-transfer-list-panel]]:border',
      '[&_[data-transfer-list-title]]:border-border [&_[data-transfer-list-title]]:bg-muted/40 [&_[data-transfer-list-title]]:border-b [&_[data-transfer-list-title]]:px-3 [&_[data-transfer-list-title]]:py-2 [&_[data-transfer-list-title]]:text-xs [&_[data-transfer-list-title]]:font-medium',
      '[&_[data-transfer-list-list]]:grid [&_[data-transfer-list-list]]:max-h-56 [&_[data-transfer-list-list]]:min-h-36 [&_[data-transfer-list-list]]:overflow-auto [&_[data-transfer-list-list]]:p-1',
      '[&_[data-transfer-list-label]]:hover:bg-accent [&_[data-transfer-list-label]]:flex [&_[data-transfer-list-label]]:items-center [&_[data-transfer-list-label]]:gap-2 [&_[data-transfer-list-label]]:rounded [&_[data-transfer-list-label]]:px-2 [&_[data-transfer-list-label]]:py-1.5 [&_[data-transfer-list-label]]:text-sm',
      '[&_[data-transfer-list-actions]]:grid [&_[data-transfer-list-actions]]:gap-2',
      '[&_[data-transfer-list-actions]>button]:border-border [&_[data-transfer-list-actions]>button]:rounded-md [&_[data-transfer-list-actions]>button]:border [&_[data-transfer-list-actions]>button]:px-2 [&_[data-transfer-list-actions]>button]:py-1',
      className,
    )}
    {...props}
  />
));
TransferList.displayName = 'TransferList';

const ListRoot = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.Root> & {
    dense?: boolean;
    disablePadding?: boolean;
  }
>(({ className, dense = false, disablePadding = false, ...props }, ref) => (
  <StructylPrimitive.List.Root
    ref={ref}
    data-dense={dense ? '' : undefined}
    className={cn('grid gap-1', !disablePadding && 'p-1', dense && 'text-sm', className)}
    {...props}
  />
));
ListRoot.displayName = 'List.Root';

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.Item> & {
    disablePadding?: boolean;
    divider?: boolean;
  }
>(({ className, disablePadding = false, divider = false, ...props }, ref) => (
  <StructylPrimitive.List.Item
    ref={ref}
    className={cn(
      'relative list-none',
      !disablePadding && 'px-0 py-0.5',
      divider && 'border-border border-b',
      className,
    )}
    {...props}
  />
));
ListItem.displayName = 'List.Item';

const ListItemButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.ItemButton> & {
    selected?: boolean;
    dense?: boolean;
    alignItems?: 'center' | 'flex-start';
  }
>(
  (
    { className, selected = false, dense = false, alignItems = 'center', disabled, ...props },
    ref,
  ) => (
    <StructylPrimitive.List.ItemButton
      ref={ref}
      disabled={disabled}
      data-state={selected ? 'selected' : undefined}
      className={cn(
        'hover:bg-accent focus-visible:ring-ring/40 flex w-full gap-3 rounded-md px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2',
        alignItems === 'center' && 'items-center',
        alignItems === 'flex-start' && 'items-start',
        dense ? 'py-1.5' : 'py-2',
        selected && 'bg-accent text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
ListItemButton.displayName = 'List.ItemButton';

const ListItemText = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.ItemText> & {
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
    inset?: boolean;
  }
>(({ className, primary, secondary, inset = false, children, ...props }, ref) => (
  <StructylPrimitive.List.ItemText
    ref={ref}
    className={cn('grid min-w-0 flex-1', inset && 'pl-9', className)}
    {...props}
  >
    {children ?? (
      <>
        {primary ? <span className="truncate">{primary}</span> : null}
        {secondary ? (
          <span className="text-muted-foreground truncate text-xs">{secondary}</span>
        ) : null}
      </>
    )}
  </StructylPrimitive.List.ItemText>
));
ListItemText.displayName = 'List.ItemText';

const ListItemIcon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.ItemIcon>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.List.ItemIcon
    ref={ref}
    className={cn(
      'text-muted-foreground inline-flex min-w-6 shrink-0 items-center justify-center',
      className,
    )}
    {...props}
  />
));
ListItemIcon.displayName = 'List.ItemIcon';

const ListItemAvatar = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.ItemAvatar>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.List.ItemAvatar
    ref={ref}
    className={cn('inline-flex min-w-10 shrink-0 items-center justify-center', className)}
    {...props}
  />
));
ListItemAvatar.displayName = 'List.ItemAvatar';

const ListItemSecondaryAction = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.ItemSecondaryAction>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.List.ItemSecondaryAction
    ref={ref}
    className={cn('absolute right-2 top-1/2 -translate-y-1/2', className)}
    {...props}
  />
));
ListItemSecondaryAction.displayName = 'List.ItemSecondaryAction';

const ListSubheader = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.List.Subheader> & {
    inset?: boolean;
    disableSticky?: boolean;
  }
>(({ className, inset = false, disableSticky = false, ...props }, ref) => (
  <StructylPrimitive.List.Subheader
    ref={ref}
    className={cn(
      'bg-bg text-muted-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      inset && 'pl-12',
      !disableSticky && 'sticky top-0 z-10',
      className,
    )}
    {...props}
  />
));
ListSubheader.displayName = 'List.Subheader';

const List = {
  Root: ListRoot,
  Item: ListItem,
  ItemButton: ListItemButton,
  ItemText: ListItemText,
  ItemIcon: ListItemIcon,
  ItemAvatar: ListItemAvatar,
  ItemSecondaryAction: ListItemSecondaryAction,
  Subheader: ListSubheader,
};

const ImageListRoot = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.ImageList.Root> & {
    cols?: 1 | 2 | 3 | 4 | 5 | 6;
    gap?: StructylSpacing;
    rowHeight?: number | 'auto';
    variant?: 'standard' | 'woven' | 'masonry' | 'quilted';
  }
>(
  (
    { className, cols = 2, gap = 3, rowHeight = 'auto', variant = 'standard', style, ...props },
    ref,
  ) => {
    const rowHeightStyle =
      typeof rowHeight === 'number'
        ? ({ '--structyl-image-list-row-height': `${rowHeight}px` } as React.CSSProperties)
        : undefined;
    return (
      <StructylPrimitive.ImageList.Root
        ref={ref}
        style={{ ...rowHeightStyle, ...style }}
        className={cn(
          variant === 'masonry' ? 'gap-3 [column-fill:_balance]' : 'grid',
          variant !== 'masonry' && gridColumnsClasses[cols],
          variant === 'masonry' && cols === 2 && 'columns-2',
          variant === 'masonry' && cols === 3 && 'columns-3',
          variant === 'masonry' && cols === 4 && 'columns-4',
          variant === 'masonry' && cols === 5 && 'columns-5',
          variant === 'masonry' && cols === 6 && 'columns-6',
          gapClasses[gap],
          variant === 'woven' && '[&>*:nth-child(even)]:mt-6',
          variant === 'quilted' && '[&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2',
          typeof rowHeight === 'number' &&
            '[&_[data-structyl-image-list-image]]:h-[var(--structyl-image-list-row-height)]',
          className,
        )}
        {...props}
      />
    );
  },
);
ImageListRoot.displayName = 'ImageList.Root';

const ImageListItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.ImageList.Item>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.ImageList.Item
    ref={ref}
    className={cn(
      'border-border bg-muted relative list-none overflow-hidden rounded-md border',
      className,
    )}
    {...props}
  />
));
ImageListItem.displayName = 'ImageList.Item';

const ImageListImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.ImageList.Image>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.ImageList.Image
    ref={ref}
    className={cn('aspect-square w-full object-cover', className)}
    {...props}
  />
));
ImageListImage.displayName = 'ImageList.Image';

const ImageListCaption = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.ImageList.Caption>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.ImageList.Caption
    ref={ref}
    className={cn(
      'bg-bg/85 absolute inset-x-0 bottom-0 px-2 py-1 text-xs backdrop-blur',
      className,
    )}
    {...props}
  />
));
ImageListCaption.displayName = 'ImageList.Caption';

const ImageList = {
  Root: ImageListRoot,
  Item: ImageListItem,
  Image: ImageListImage,
  Caption: ImageListCaption,
};

const TableRoot = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Root> & {
    size?: Exclude<StructylSize, 'large'>;
    stickyHeader?: boolean;
  }
>(({ className, size = 'medium', stickyHeader = false, ...props }, ref) => (
  <StructylPrimitive.Table.Root
    ref={ref}
    data-size={size}
    data-sticky-header={stickyHeader ? '' : undefined}
    className={cn(
      'w-full caption-bottom text-sm',
      size === 'small' && '[&_td]:py-1 [&_th]:h-8',
      stickyHeader && '[&_thead]:bg-bg [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10',
      className,
    )}
    {...props}
  />
));
TableRoot.displayName = 'Table.Root';

const TableHeader = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Table.Header>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Header>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Table.Header
    ref={ref}
    className={cn('[&_tr]:border-b', className)}
    {...props}
  />
));
TableHeader.displayName = 'Table.Header';

const TableBody = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Table.Body>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Body>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Table.Body
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'Table.Body';

const TableFooter = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Table.Footer>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Footer>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Table.Footer
    ref={ref}
    className={cn('bg-muted/40 border-t font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'Table.Footer';

const TableRow = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Table.Row>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Row>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Table.Row
    ref={ref}
    className={cn('border-border hover:bg-muted/40 border-b transition-colors', className)}
    {...props}
  />
));
TableRow.displayName = 'Table.Row';

const TableHead = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Table.Head>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Head>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Table.Head
    ref={ref}
    className={cn('text-muted-foreground h-10 px-3 text-left align-middle font-medium', className)}
    {...props}
  />
));
TableHead.displayName = 'Table.Head';

const TableCell = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Table.Cell>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Cell>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Table.Cell
    ref={ref}
    className={cn('px-3 py-2 align-middle', className)}
    {...props}
  />
));
TableCell.displayName = 'Table.Cell';

const TableCaption = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Table.Caption>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Table.Caption>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Table.Caption
    ref={ref}
    className={cn('text-muted-foreground mt-4 text-sm', className)}
    {...props}
  />
));
TableCaption.displayName = 'Table.Caption';

const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
};

const Backdrop = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Backdrop>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Backdrop
    ref={ref}
    className={cn(
      'bg-fg/45 fixed inset-0 z-40 backdrop-blur-sm',
      'data-[invisible]:bg-transparent data-[invisible]:backdrop-blur-0',
      className,
    )}
    {...props}
  />
));
Backdrop.displayName = 'Backdrop';

const Snackbar = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Snackbar>,
  PrimitiveSnackbarProps
>(({ className, anchorOrigin = { vertical: 'bottom', horizontal: 'left' }, ...props }, ref) => (
  <StructylPrimitive.Snackbar
    ref={ref}
    anchorOrigin={anchorOrigin}
    className={cn(
      'border-border bg-popover text-popover-foreground shadow-overlay fixed z-50 flex min-h-11 items-center gap-3 rounded-md border px-4 py-2 text-sm',
      '[&_[data-snackbar-action]]:ml-auto',
      anchorOrigin.vertical === 'top' ? 'top-4' : 'bottom-4',
      anchorOrigin.horizontal === 'left' && 'left-4',
      anchorOrigin.horizontal === 'right' && 'right-4',
      anchorOrigin.horizontal === 'center' && 'left-1/2 -translate-x-1/2',
      className,
    )}
    {...props}
  />
));
Snackbar.displayName = 'Snackbar';

const Modal = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Modal>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Modal>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Modal
    ref={ref}
    className={cn(
      'bg-fg/45 fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm',
      className,
    )}
    {...props}
  />
));
Modal.displayName = 'Modal';

const AppBar = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.AppBar>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.AppBar> & {
    position?: 'static' | 'sticky' | 'fixed' | 'absolute' | 'relative';
    color?: StructylColor;
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    square?: boolean;
  }
>(
  (
    { className, position = 'static', color = 'default', elevation = 0, square = true, ...props },
    ref,
  ) => (
    <StructylPrimitive.AppBar
      ref={ref}
      className={cn(
        'border-border z-30 flex h-14 items-center border-b px-4 backdrop-blur',
        surfaceColorClasses[color],
        color === 'default' && 'bg-bg/95',
        !square && 'rounded-md',
        elevationClasses[elevation],
        position === 'sticky' && 'sticky top-0',
        position === 'fixed' && 'fixed inset-x-0 top-0',
        position === 'absolute' && 'absolute inset-x-0 top-0',
        position === 'relative' && 'relative',
        className,
      )}
      {...props}
    />
  ),
);
AppBar.displayName = 'AppBar';

const BottomNavigationRoot = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.BottomNavigation.Root>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.BottomNavigation.Root>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.BottomNavigation.Root
    ref={ref}
    className={cn('border-border bg-bg flex h-14 items-center justify-around border-t', className)}
    {...props}
  />
));
BottomNavigationRoot.displayName = 'BottomNavigation.Root';

const BottomNavigationItem = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.BottomNavigation.Item>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.BottomNavigation.Item>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.BottomNavigation.Item
    ref={ref}
    className={cn(
      'text-muted-foreground flex h-full min-w-16 flex-col items-center justify-center gap-0.5 px-3 text-xs transition-colors',
      'data-[state=checked]:text-primary hover:text-fg focus-visible:ring-ring/40 focus-visible:outline-none focus-visible:ring-2',
      '[&_[data-bottom-navigation-icon]>svg]:size-4 [&_[data-bottom-navigation-label][data-hidden]]:hidden',
      className,
    )}
    {...props}
  />
));
BottomNavigationItem.displayName = 'BottomNavigation.Item';

const BottomNavigation = {
  Root: BottomNavigationRoot,
  Item: BottomNavigationItem,
};

const SpeedDialRoot = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.SpeedDial.Root>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.SpeedDial.Root>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.SpeedDial.Root
    ref={ref}
    className={cn(
      'group fixed bottom-6 right-6 z-40 grid gap-2',
      'data-[direction=down]:justify-items-end data-[direction=up]:justify-items-end',
      'data-[direction=left]:grid-flow-col data-[direction=left]:items-center',
      'data-[direction=right]:grid-flow-col data-[direction=right]:items-center',
      className,
    )}
    {...props}
  />
));
SpeedDialRoot.displayName = 'SpeedDial.Root';

const SpeedDialTrigger = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.SpeedDial.Trigger>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.SpeedDial.Trigger>
>(({ className, children, icon, 'aria-label': ariaLabel, ...props }, ref) => (
  <StructylPrimitive.SpeedDial.Trigger
    ref={ref}
    aria-label={ariaLabel ?? 'Toggle actions'}
    icon={icon ?? <Plus className="size-5" />}
    className={cn(buttonVariants({ size: 'icon-lg' }), 'rounded-full shadow-lg', className)}
    {...props}
  >
    {children}
  </StructylPrimitive.SpeedDial.Trigger>
));
SpeedDialTrigger.displayName = 'SpeedDial.Trigger';

const SpeedDialContent = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.SpeedDial.Content>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.SpeedDial.Content>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.SpeedDial.Content
    ref={ref}
    className={cn(
      'grid gap-2',
      'group-data-[direction=left]:grid-flow-col group-data-[direction=right]:grid-flow-col',
      className,
    )}
    {...props}
  />
));
SpeedDialContent.displayName = 'SpeedDial.Content';

const SpeedDialAction = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.SpeedDial.Action>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.SpeedDial.Action> & {
    tooltipTitle?: React.ReactNode;
    tooltipOpen?: boolean;
  }
>(({ className, children, tooltipTitle, tooltipOpen = false, ...props }, ref) => (
  <StructylPrimitive.SpeedDial.Action
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'secondary', size: 'icon' }),
      'group relative rounded-full shadow-md',
      className,
    )}
    {...props}
  >
    {children}
    {tooltipTitle ? (
      <span
        className={cn(
          'border-border bg-popover text-popover-foreground pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-xs opacity-0 shadow-md',
          tooltipOpen && 'opacity-100',
          'group-hover:opacity-100',
        )}
      >
        {tooltipTitle}
      </span>
    ) : null}
  </StructylPrimitive.SpeedDial.Action>
));
SpeedDialAction.displayName = 'SpeedDial.Action';

const SpeedDial = {
  Root: SpeedDialRoot,
  Trigger: SpeedDialTrigger,
  Content: SpeedDialContent,
  Action: SpeedDialAction,
};

const Masonry = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.Masonry>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Masonry> & {
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
    spacing?: StructylSpacing;
  }
>(({ className, columns = 3, spacing = 4, ...props }, ref) => (
  <StructylPrimitive.Masonry
    ref={ref}
    className={cn(
      '[column-fill:_balance]',
      gapClasses[spacing],
      columns === 1 && 'columns-1',
      columns === 2 && 'columns-2',
      columns === 3 && 'columns-3',
      columns === 4 && 'columns-4',
      columns === 5 && 'columns-5',
      columns === 6 && 'columns-6',
      spacing === 0 && '[&>*]:mb-0',
      spacing === 1 && '[&>*]:mb-1',
      spacing === 2 && '[&>*]:mb-2',
      spacing === 3 && '[&>*]:mb-3',
      spacing === 4 && '[&>*]:mb-4',
      spacing === 5 && '[&>*]:mb-5',
      spacing === 6 && '[&>*]:mb-6',
      spacing === 8 && '[&>*]:mb-8',
      '[&>*]:break-inside-avoid',
      className,
    )}
    {...props}
  />
));
Masonry.displayName = 'Masonry';

const TimelineRoot = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Timeline.Root> & {
    position?: 'left' | 'right' | 'alternate';
  }
>(({ className, position = 'right', ...props }, ref) => (
  <StructylPrimitive.Timeline.Root
    ref={ref}
    data-position={position}
    className={cn(
      'grid gap-4',
      position === 'alternate' &&
        '[&>li:nth-child(even)>[data-structyl-timeline-content]]:row-start-1 [&>li:nth-child(even)]:grid-cols-[1fr_auto]',
      className,
    )}
    {...props}
  />
));
TimelineRoot.displayName = 'Timeline.Root';

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Timeline.Item>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Timeline.Item
    ref={ref}
    className={cn('grid grid-cols-[auto_1fr] gap-3', className)}
    {...props}
  />
));
TimelineItem.displayName = 'Timeline.Item';

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Timeline.Separator>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Timeline.Separator
    ref={ref}
    className={cn('grid justify-items-center gap-1', className)}
    {...props}
  />
));
TimelineSeparator.displayName = 'Timeline.Separator';

const TimelineDot = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Timeline.Dot> & {
    color?: Exclude<StructylColor, 'inherit' | 'transparent'>;
    variant?: 'filled' | 'outlined';
  }
>(({ className, color = 'primary', variant = 'filled', ...props }, ref) => (
  <StructylPrimitive.Timeline.Dot
    ref={ref}
    className={cn(
      'size-2.5 rounded-full border',
      variant === 'filled' && color === 'default' && 'border-muted bg-muted',
      variant === 'filled' &&
        color !== 'default' &&
        `border-transparent ${surfaceColorClasses[color]}`,
      variant === 'outlined' && chipOutlineColorClasses[color],
      className,
    )}
    {...props}
  />
));
TimelineDot.displayName = 'Timeline.Dot';

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.Timeline.Content>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.Timeline.Content
    ref={ref}
    className={cn('pb-4 text-sm', className)}
    {...props}
  />
));
TimelineContent.displayName = 'Timeline.Content';

const Timeline = {
  Root: TimelineRoot,
  Item: TimelineItem,
  Separator: TimelineSeparator,
  Dot: TimelineDot,
  Content: TimelineContent,
};

const ClickAwayListener = StructylPrimitive.ClickAwayListener;
const NoSsr = StructylPrimitive.NoSsr;
const Portal = StructylPrimitive.Portal;

const Popper = React.forwardRef<HTMLDivElement, PopperProps>(
  (props, ref) => <StructylPrimitive.Popper ref={ref} {...props} />,
);
Popper.displayName = 'Popper';

const TextareaAutosize = React.forwardRef<
  React.ElementRef<typeof StructylPrimitive.TextareaAutosize>,
  React.ComponentPropsWithoutRef<typeof StructylPrimitive.TextareaAutosize>
>(({ className, ...props }, ref) => (
  <StructylPrimitive.TextareaAutosize
    ref={ref}
    className={cn(
      'border-border bg-bg shadow-xs flex min-h-9 w-full rounded-md border px-3 py-2 text-sm',
      'placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:outline-none focus-visible:ring-2',
      'disabled:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
TextareaAutosize.displayName = 'TextareaAutosize';

export type TransitionAnimation =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'grow'
  | 'collapse';

const TRANSITION_CLASSES: Record<TransitionAnimation, string> = {
  fade:
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0',
  'slide-up':
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 data-[state=entering]:slide-in-from-bottom-4 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0 data-[state=exiting]:slide-out-to-bottom-4',
  'slide-down':
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 data-[state=entering]:slide-in-from-top-4 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0 data-[state=exiting]:slide-out-to-top-4',
  'slide-left':
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 data-[state=entering]:slide-in-from-right-4 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0 data-[state=exiting]:slide-out-to-right-4',
  'slide-right':
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 data-[state=entering]:slide-in-from-left-4 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0 data-[state=exiting]:slide-out-to-left-4',
  zoom:
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 data-[state=entering]:zoom-in-75 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0 data-[state=exiting]:zoom-out-75',
  grow:
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 data-[state=entering]:zoom-in-90 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0 data-[state=exiting]:zoom-out-90',
  collapse:
    'data-[state=entering]:animate-in data-[state=entering]:fade-in-0 data-[state=entering]:slide-in-from-top-2 ' +
    'data-[state=exiting]:animate-out data-[state=exiting]:fade-out-0 data-[state=exiting]:slide-out-to-top-2',
};

export interface TransitionProps extends PrimitiveTransitionProps {
  animation?: TransitionAnimation;
}

const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  ({ className, animation = 'fade', ...props }, ref) => (
    <StructylPrimitive.Transition
      ref={ref}
      className={cn(
        TRANSITION_CLASSES[animation],
        'data-[state=exited]:hidden',
        className,
      )}
      {...props}
    />
  ),
);
Transition.displayName = 'Transition';

const CssBaseline = StructylPrimitive.CssBaseline;
const InitColorSchemeScript = StructylPrimitive.InitColorSchemeScript;

const TransferRightIcon = ChevronsRight;
const TransferLeftIcon = ChevronsLeft;
const SelectedIcon = Check;

export {
  Box,
  Container,
  Stack,
  Grid,
  Paper,
  Typography,
  Link,
  SvgIcon,
  Chart,
  Chip,
  ButtonGroup,
  FloatingActionButton,
  Fab,
  Rating,
  Autocomplete,
  TransferList,
  TransferRightIcon,
  TransferLeftIcon,
  SelectedIcon,
  List,
  ImageList,
  Table,
  Backdrop,
  Snackbar,
  Modal,
  AppBar,
  BottomNavigation,
  SpeedDial,
  Masonry,
  Timeline,
  ClickAwayListener,
  NoSsr,
  Portal,
  Popper,
  TextareaAutosize,
  Transition,
  CssBaseline,
  InitColorSchemeScript,
};
