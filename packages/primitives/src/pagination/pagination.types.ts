import type * as React from 'react';

export interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'onChange'> {
  current?: number;
  total?: number;
  onChange?: (page: number) => void;
}
