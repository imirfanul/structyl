'use client';

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Item } from './index';

describe('RadioGroup (styled)', () => {
  it('renders and toggles selection', () => {
    const { getAllByRole } = render(
      <Root>
        <div>
          <Item value="a" aria-label="A" />
          <span>A</span>
        </div>
        <div>
          <Item value="b" aria-label="B" />
          <span>B</span>
        </div>
      </Root>,
    );

    const radios = getAllByRole('radio');
    expect(radios[0].getAttribute('aria-checked')).toBe('false');
    fireEvent.click(radios[0]);
    expect(radios[0].getAttribute('aria-checked')).toBe('true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Root>
        <div>
          <Item value="a" aria-label="A" />
          <span>A</span>
        </div>
        <div>
          <Item value="b" aria-label="B" />
          <span>B</span>
        </div>
      </Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
