'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from '@aura-ui/icons';
import { cn } from '@aura-ui/utils';
import { buttonVariants, type ButtonProps } from '../button';

// ── Low-level building blocks ─────────────────────────────────────────────────

const Root: React.FC<React.ComponentProps<'nav'>> = ({ className, ...props }) => (
  <nav role="navigation" aria-label="pagination" className={cn('mx-auto flex w-full justify-center', className)} {...props} />
);
Root.displayName = 'Pagination.Root';

const Content = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  ),
);
Content.displayName = 'Pagination.Content';

const Item = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />,
);
Item.displayName = 'Pagination.Item';

interface PaginationLinkProps extends React.ComponentPropsWithoutRef<'button'>, Pick<ButtonProps, 'size'> {
  isActive?: boolean;
}

const Link: React.FC<PaginationLinkProps> = ({ className, isActive, size = 'icon', ...props }) => (
  <button
    type="button"
    aria-current={isActive ? 'page' : undefined}
    className={cn(buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }), className)}
    {...props}
  />
);
Link.displayName = 'Pagination.Link';

const Previous: React.FC<React.ComponentProps<typeof Link>> = ({ className, ...props }) => (
  <Link aria-label="Go to previous page" size="default" className={cn('gap-1 pl-2.5', className)} {...props}>
    <ChevronLeft className="h-4 w-4" aria-hidden />
    <span>Previous</span>
  </Link>
);
Previous.displayName = 'Pagination.Previous';

const Next: React.FC<React.ComponentProps<typeof Link>> = ({ className, ...props }) => (
  <Link aria-label="Go to next page" size="default" className={cn('gap-1 pr-2.5', className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" aria-hidden />
  </Link>
);
Next.displayName = 'Pagination.Next';

const First: React.FC<React.ComponentProps<typeof Link>> = ({ className, ...props }) => (
  <Link aria-label="Go to first page" size="icon" className={className} {...props}>
    <ChevronsLeft className="h-4 w-4" aria-hidden />
  </Link>
);
First.displayName = 'Pagination.First';

const Last: React.FC<React.ComponentProps<typeof Link>> = ({ className, ...props }) => (
  <Link aria-label="Go to last page" size="icon" className={className} {...props}>
    <ChevronsRight className="h-4 w-4" aria-hidden />
  </Link>
);
Last.displayName = 'Pagination.Last';

const Ellipsis: React.FC<React.ComponentProps<'span'>> = ({ className, ...props }) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
Ellipsis.displayName = 'Pagination.Ellipsis';

// ── Compound smart pagination ─────────────────────────────────────────────────
// Handles ellipsis logic, page-size selector, and jump-to-page.

export interface SmartPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  /** Max page buttons before collapsing to ellipsis */
  siblingCount?: number;
  showFirstLast?: boolean;
  showJumpTo?: boolean;
  showPageSize?: boolean;
  className?: string;
}

function buildPageRange(current: number, total: number, siblings: number): (number | '...')[] {
  const range: (number | '...')[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  range.push(1);
  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('...');
  if (total > 1) range.push(total);

  return range;
}

const SmartPagination: React.FC<SmartPaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  siblingCount = 1,
  showFirstLast = false,
  showJumpTo = false,
  showPageSize = false,
  className,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = buildPageRange(page, totalPages, siblingCount);
  const [jumpValue, setJumpValue] = React.useState('');

  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const n = parseInt(jumpValue, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onPageChange(n);
      setJumpValue('');
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-3', className)}>
      <Root>
        <Content>
          {showFirstLast && <Item><First onClick={() => onPageChange(1)} disabled={page <= 1} /></Item>}
          <Item><Previous onClick={() => onPageChange(page - 1)} disabled={page <= 1} /></Item>

          {pages.map((p, i) =>
            p === '...' ? (
              <Item key={`ellipsis-${i}`}><Ellipsis /></Item>
            ) : (
              <Item key={p}>
                <Link isActive={p === page} onClick={() => onPageChange(p as number)}>
                  {p}
                </Link>
              </Item>
            ),
          )}

          <Item><Next onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} /></Item>
          {showFirstLast && <Item><Last onClick={() => onPageChange(totalPages)} disabled={page >= totalPages} /></Item>}
        </Content>
      </Root>

      {showPageSize && onPageSizeChange && (
        <select
          aria-label="Rows per page"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border-border bg-bg h-9 rounded-md border px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>{s} / page</option>
          ))}
        </select>
      )}

      {showJumpTo && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span>Go to</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={handleJump}
            aria-label="Jump to page"
            className="border-border bg-bg focus:ring-ring h-9 w-14 rounded-md border px-2 text-center text-sm focus:outline-none focus:ring-2"
          />
        </div>
      )}
    </div>
  );
};
SmartPagination.displayName = 'SmartPagination';

export { Root, Content, Item, Link, Previous, Next, First, Last, Ellipsis, SmartPagination };
