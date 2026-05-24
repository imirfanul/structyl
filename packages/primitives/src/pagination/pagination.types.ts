import type * as React from 'react';

export interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {
  current?: number;
  total?: number;
  onChange?: (page: number) => void;
}
