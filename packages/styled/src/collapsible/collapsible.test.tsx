'use client';

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Trigger, Content } from './index';

describe('Collapsible (styled)', () => {
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
