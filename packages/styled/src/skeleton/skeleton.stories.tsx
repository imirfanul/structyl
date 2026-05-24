import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta: Meta = {
  title: 'Styled/Skeleton',
  component: Skeleton as any,
};

export default meta;

export const Default = () => (
  <div className="space-y-2">
    <Skeleton className="w-64" />
    <Skeleton className="w-48" />
  </div>
);
