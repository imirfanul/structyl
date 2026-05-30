import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './index';

describe('EmptyState (styled)', () => {
  it('renders the required title', () => {
    render(<EmptyState title="No results found" />);
    expect(screen.getByText('No results found')).toBeDefined();
  });

  it('renders optional description and action', () => {
    render(
      <EmptyState
        title="No items"
        description="Try adjusting your filters."
        action={<button>Reset filters</button>}
      />,
    );
    expect(screen.getByText('Try adjusting your filters.')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset filters' })).toBeDefined();
  });

  it('renders in page and section sizes', () => {
    const { rerender } = render(<EmptyState title="Empty" size="page" />);
    rerender(<EmptyState title="Empty" size="section" />);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <EmptyState
        title="No data"
        description="There is nothing here yet."
        action={<button>Add item</button>}
      />,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
