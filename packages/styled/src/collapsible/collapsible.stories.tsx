'use client';

import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Root, Trigger, Content } from './index';

const meta: Meta = { title: 'Styled/Collapsible' };
export default meta;

export const Default = () => (
  <Root>
    <Trigger>Toggle</Trigger>
    <Content>Hidden content</Content>
  </Root>
);
