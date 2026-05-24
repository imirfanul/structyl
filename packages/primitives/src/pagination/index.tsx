'use client';

import * as React from 'react';
import { Primitive } from '@aura-ui/core';
import type { PaginationProps } from './pagination.types';

const Root = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, current = 1, total = 1, onChange, ...props }, ref) => {
    const pages = Math.max(1, Math.ceil(total));
    const handleClick = (page: number) => {
      if (page === current) return;
      onChange?.(page);
    };
    return (
      <Primitive.nav aria-label="Pagination" ref={ref} {...props}>
        <div className={className}>
          <button
            type="button"
            onClick={() => handleClick(Math.max(1, current - 1))}
            aria-label="Previous"
          >
            Prev
          </button>
          {Array.from({ length: pages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                type="button"
                aria-current={page === current ? 'page' : undefined}
                onClick={() => handleClick(page)}
              >
                {page}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleClick(Math.min(pages, current + 1))}
            aria-label="Next"
          >
            Next
          </button>
        </div>
      </Primitive.nav>
    );
  },
);
Root.displayName = 'Pagination.Root';

export { Root };
