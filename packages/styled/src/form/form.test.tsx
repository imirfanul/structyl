'use client';

import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Field, Label, Control, Message } from './index';

describe('Form (styled)', () => {
  it('renders field and passes accessibility', async () => {
    const { container, getByText } = render(
      <Root>
        <Field>
          <Label>Foo</Label>
          <Control as="input" />
          <Message>Help</Message>
        </Field>
      </Root>,
    );
    expect(getByText('Foo')).toBeTruthy();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
