import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Banner } from './index';

describe('Banner (styled)', () => {
  it('renders children', () => {
    render(<Banner>We use cookies.</Banner>);
    expect(screen.getByText('We use cookies.')).toBeDefined();
  });

  it('renders all variants without error', () => {
    const variants = ['default', 'info', 'success', 'warning', 'error', 'brand'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Banner variant={variant}>Content</Banner>);
      unmount();
    }
  });

  it('renders an action and dismiss button, firing onDismiss', () => {
    const onDismiss = vi.fn();
    render(
      <Banner dismissible onDismiss={onDismiss} action={<a href="#go">Learn more</a>}>
        New release
      </Banner>,
    );
    expect(screen.getByText('Learn more')).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Banner variant="info" dismissible>
        Scheduled maintenance tonight.
      </Banner>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
