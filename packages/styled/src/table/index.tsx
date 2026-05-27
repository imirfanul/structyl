'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';

// ── Root ──────────────────────────────────────────────────────────────────────

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Shrinks to content width instead of full-width */
  compact?: boolean;
}

const Root = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, compact = false, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn(
          'caption-bottom text-sm',
          compact ? 'w-auto' : 'w-full',
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Root.displayName = 'Table';

// ── Caption ───────────────────────────────────────────────────────────────────

const Caption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  ),
);
Caption.displayName = 'Table.Caption';

// ── Header ────────────────────────────────────────────────────────────────────

const Header = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:border-border', className)} {...props} />
  ),
);
Header.displayName = 'Table.Header';

// ── Body ──────────────────────────────────────────────────────────────────────

const Body = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
);
Body.displayName = 'Table.Body';

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
  ),
);
Footer.displayName = 'Table.Footer';

// ── Row ───────────────────────────────────────────────────────────────────────

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Highlight this row */
  selected?: boolean;
}

const Row = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={cn(
        'border-b border-border transition-colors',
        'hover:bg-muted/50',
        'data-[selected]:bg-muted',
        className,
      )}
      {...props}
    />
  ),
);
Row.displayName = 'Table.Row';

// ── Head cell ─────────────────────────────────────────────────────────────────

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Make this column sortable — shows sort icon */
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | false;
}

const Head = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground',
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        sortable && 'cursor-pointer select-none hover:text-fg',
        className,
      )}
      aria-sort={sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : undefined}
      {...props}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <span className="text-muted-foreground/50" aria-hidden>
            {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕'}
          </span>
        </span>
      ) : children}
    </th>
  ),
);
Head.displayName = 'Table.Head';

// ── Cell ──────────────────────────────────────────────────────────────────────

const Cell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-4 align-middle',
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  ),
);
Cell.displayName = 'Table.Cell';

// Named exports for compound API: <Table.Root>, <Table.Header>, etc.
export { Root, Caption, Header, Body, Footer, Row, Head, Cell };

// Also export as default namespace for convenience
const Table = { Root, Caption, Header, Body, Footer, Row, Head, Cell };
export default Table;
