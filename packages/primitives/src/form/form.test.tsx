'use client';

import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Field, Label, Control, Message } from './index';

describe('Form (primitive)', () => {
  it('renders a form field with label and message', async () => {
    const { container, getByText } = render(
      <Root>
        <Field name="foo">
          <Label htmlFor="foo">Foo</Label>
          <Control as="input" id="foo" />
          <Message>Help text</Message>
        </Field>
      </Root>,
    );
    expect(getByText('Foo')).toBeTruthy();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as FormModule from './';
import { renderFormAxeFixture } from '../../test/axe-fixtures';

describe('Form (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(FormModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderFormAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
