import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Rating } from './index';

describe('Rating (styled)', () => {
  it('renders the correct number of stars', () => {
    const { container } = render(<Rating max={5} aria-label="Product rating" />);
    // one SVG icon per star
    expect(container.querySelectorAll('svg')).toHaveLength(5);
  });

  it('renders custom max', () => {
    const { container } = render(<Rating max={10} aria-label="Product rating" />);
    expect(container.querySelectorAll('svg')).toHaveLength(10);
  });

  it('calls onChange when a star is clicked', async () => {
    const onChange = vi.fn();
    const { container } = render(<Rating onChange={onChange} aria-label="Product rating" />);
    // click the 3rd star span (0-indexed)
    const spans = container.querySelectorAll<HTMLElement>('span');
    await userEvent.click(spans[2]!);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn();
    const { container } = render(<Rating disabled onChange={onChange} aria-label="Product rating" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(container.querySelectorAll<HTMLElement>('span')[0]!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('marks readOnly via data attribute', () => {
    render(<Rating readOnly value={3} aria-label="Product rating" />);
    expect(screen.getByRole('slider')).toHaveAttribute('data-readonly', '');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Rating defaultValue={3} aria-label="Product rating" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
