import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Typography } from './index';

describe('Typography (styled)', () => {
  it('renders children', () => {
    render(<Typography>Hello world</Typography>);
    expect(screen.getByText('Hello world')).toBeDefined();
  });

  it('renders heading variants with correct element', () => {
    for (const variant of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const) {
      const { unmount } = render(<Typography variant={variant}>{variant} text</Typography>);
      expect(screen.getByRole('heading', { name: `${variant} text` })).toBeDefined();
      unmount();
    }
  });

  it('renders body variants without error', () => {
    for (const variant of ['body1', 'body2', 'caption', 'overline', 'lead'] as const) {
      const { unmount } = render(<Typography variant={variant}>Text</Typography>);
      unmount();
    }
  });

  it('renders with a custom element via as prop', () => {
    render(<Typography variant="body1" as="span">Span text</Typography>);
    const el = screen.getByText('Span text');
    expect(el.tagName.toLowerCase()).toBe('span');
  });

  it('renders color variants without error', () => {
    for (const color of ['primary', 'secondary', 'muted', 'error'] as const) {
      const { unmount } = render(<Typography color={color}>Text</Typography>);
      unmount();
    }
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <Typography variant="h1">Page title</Typography>
        <Typography variant="body1">Body content here.</Typography>
        <Typography variant="caption">Caption text</Typography>
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
