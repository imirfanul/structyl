import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Kbd, KeyCombo } from './index';

describe('Kbd (styled)', () => {
  it('renders key text', () => {
    render(<Kbd>Enter</Kbd>);
    expect(screen.getByText('Enter')).toBeDefined();
  });

  it('renders all sizes without error', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      const { unmount } = render(<Kbd size={size}>⌘</Kbd>);
      unmount();
    }
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Kbd>Escape</Kbd>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe('KeyCombo (styled)', () => {
  it('renders all keys', () => {
    render(<KeyCombo keys={['⌘', 'K']} />);
    expect(screen.getByText('⌘')).toBeDefined();
    expect(screen.getByText('K')).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<KeyCombo keys={['Ctrl', 'Shift', 'P']} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
