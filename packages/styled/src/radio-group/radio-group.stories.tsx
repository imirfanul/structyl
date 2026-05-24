'use client';

import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Root, Item } from './index';

const meta: Meta = {
  title: 'Styled/RadioGroup',
};

export default meta;

export const Default = () => (
  <Root>
    <Item value="1" aria-label="Option 1" />
    <Item value="2" aria-label="Option 2" />
  </Root>
);
