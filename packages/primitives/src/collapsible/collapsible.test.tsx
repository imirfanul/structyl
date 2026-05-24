'use client';

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Trigger, Content } from './index';

describe('Collapsible (primitive)', () => {
  it('toggles content visibility', () => {
    const { getByText } = render(
      <Root>
        <Trigger>Toggle</Trigger>
        <Content>Hidden</Content>
      </Root>,
    );
    const button = getByText('Toggle');
    expect(() => getByText('Hidden')).toThrow();
    fireEvent.click(button);
    expect(getByText('Hidden')).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Root>
        <Trigger>Toggle</Trigger>
        <Content>Hidden</Content>
      </Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Collapsible from './';
import { renderCollapsibleAxeFixture } from '../../test/axe-fixtures';

describe('Collapsible (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Collapsible);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderCollapsibleAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
