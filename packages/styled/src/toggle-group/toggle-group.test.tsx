'use client';

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Item } from './index';

describe('ToggleGroup (styled)', () => {
  it('toggles item selection', () => {
    const { getAllByRole } = render(
      <Root>
        <Item value="a">A</Item>
        <Item value="b">B</Item>
      </Root>,
    );

    const items = getAllByRole('button');
    fireEvent.click(items[0]);
    expect(items[0].getAttribute('aria-pressed')).toBe('true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Root>
        <Item value="a">A</Item>
        <Item value="b">B</Item>
      </Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
