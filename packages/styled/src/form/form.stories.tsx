'use client';

import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Root, Field, Label, Control, Message } from './index';

const meta: Meta = { title: 'Form/Basic' };
export default meta;

export const Default = () => (
  <Root>
    <Field>
      <Label>Username</Label>
      <Control as="input" />
      <Message>Enter your username</Message>
    </Field>
  </Root>
);
