import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Callout } from './index';

describe('Callout (styled)', () => {
  it('renders children', () => {
    render(<Callout>Callout content</Callout>);
    expect(screen.getByText('Callout content')).toBeDefined();
  });

  it('renders with title', () => {
    render(<Callout title="Heads up">Important message</Callout>);
    expect(screen.getByText('Heads up')).toBeDefined();
  });

  it('renders all variants without error', () => {
    const variants = ['default', 'info', 'success', 'warning', 'error', 'neutral'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Callout variant={variant}>Content</Callout>);
      unmount();
    }
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Callout title="Note" variant="info">Read this carefully.</Callout>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
