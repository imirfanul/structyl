'use client';

import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Root, Item } from './index';

const meta: Meta = { title: 'Styled/ToggleGroup' };
export default meta;

export const Default = () => (
  <Root>
    <Item value="a">A</Item>
    <Item value="b">B</Item>
  </Root>
);
