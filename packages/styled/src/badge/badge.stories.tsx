import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Badge } from './index';

const meta: Meta = {
  title: 'Styled/Badge',
  component: Badge as any,
};

export default meta;

export const Default = () => (
  <div className="space-x-2">
    <Badge>Default</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
);
