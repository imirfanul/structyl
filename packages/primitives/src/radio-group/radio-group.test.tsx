'use client';

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Item } from './index';

describe('RadioGroup (primitive)', () => {
  it('changes selection when item clicked', () => {
    const { getAllByRole } = render(
      <Root>
        <Item value="one">One</Item>
        <Item value="two">Two</Item>
      </Root>,
    );

    const radios = getAllByRole('radio');
    expect(radios[0].getAttribute('aria-checked')).toBe('false');
    fireEvent.click(radios[0]);
    expect(radios[0].getAttribute('aria-checked')).toBe('true');
    fireEvent.click(radios[1]);
    expect(radios[1].getAttribute('aria-checked')).toBe('true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Root>
        <Item value="one">One</Item>
        <Item value="two">Two</Item>
      </Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as RadioGroup from './';
import { renderRadioGroupAxeFixture } from '../../test/axe-fixtures';

describe('RadioGroup (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(RadioGroup);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderRadioGroupAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
