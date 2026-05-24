'use client';

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Item } from './index';

describe('ToggleGroup (primitive)', () => {
  it('toggles single selection', () => {
    const { getAllByRole } = render(
      <Root type="single">
        <Item value="a">A</Item>
        <Item value="b">B</Item>
      </Root>,
    );
    const btns = getAllByRole('button');
    const btn = btns[0];
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-pressed')).toBe('true');
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
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ToggleGroup from './';
import { renderToggleGroupAxeFixture } from '../../test/axe-fixtures';

describe('ToggleGroup (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(ToggleGroup);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderToggleGroupAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
