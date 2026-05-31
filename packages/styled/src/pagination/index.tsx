'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@structyl/icons';
import { cn } from '@structyl/utils';
import { Button } from '../button';
import * as Select from '../select';

// ── Pagination ─────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Current page number (1-based) */
  page: number;
  /** Total number of pages */
  pageCount: number;
  /** Current page size */
  pageSize?: number;
  /** Total row count shown on the left */
  totalRows?: number;
  /** Called when the user navigates to a different page */
  onPageChange: (page: number) => void;
  /** Called when the user changes the page size; if omitted the rows-per-page selector is hidden */
  onPageSizeChange?: (pageSize: number) => void;
  /** Options for the rows-per-page selector */
  pageSizeOptions?: number[];
  /** Show the "X total rows" label (only visible when totalRows is provided) */
  showTotalRows?: boolean;
  className?: string;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      page,
      pageCount,
      pageSize = 10,
      totalRows,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 25, 50, 100],
      showTotalRows = true,
      className,
    },
    ref,
  ) => {
    const totalPages = Math.max(pageCount, 1);
    const canPrev = page > 1;
    const canNext = page < totalPages;

    const pageOptions = Array.from({ length: totalPages }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    }));

    const pageSizeSelectOptions = pageSizeOptions.map((s) => ({
      value: String(s),
      label: String(s),
    }));

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between',
          className,
        )}
      >
        {/* Left: total rows + rows per page */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
          {showTotalRows && totalRows !== undefined && (
            <span className="tabular-nums">{totalRows} total rows</span>
          )}
          {onPageSizeChange && (
            <label className="flex items-center gap-2">
              <span className="whitespace-nowrap">Rows per page</span>
              <Select.Root
                value={String(pageSize)}
                onValueChange={(v) => onPageSizeChange(Number(v))}
              >
                <Select.Trigger className="h-8 w-20">
                  <Select.Value />
                </Select.Trigger>
                <Select.Content options={pageSizeSelectOptions} />
              </Select.Root>
            </label>
          )}
        </div>

        {/* Right: page navigation */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-muted-foreground mr-1 text-sm tabular-nums">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(1)}
            disabled={!canPrev}
            aria-label="First page"
            title="First page"
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(page - 1)}
            disabled={!canPrev}
            aria-label="Previous page"
            title="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Select.Root
            value={String(page)}
            onValueChange={(v) => onPageChange(Number(v))}
          >
            <Select.Trigger className="h-8 w-16" aria-label="Go to page">
              <Select.Value />
            </Select.Trigger>
            <Select.Content options={pageOptions} />
          </Select.Root>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(page + 1)}
            disabled={!canNext}
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(totalPages)}
            disabled={!canNext}
            aria-label="Last page"
            title="Last page"
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  },
);
Pagination.displayName = 'Pagination';

export { Pagination };
