import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Marquee } from './index';

describe('Marquee (styled)', () => {
  it('renders children', () => {
    render(
      <Marquee>
        <span>Logo</span>
      </Marquee>,
    );
    // repeat defaults to 2, so the content appears twice
    expect(screen.getAllByText('Logo')).toHaveLength(2);
  });

  it('respects a custom repeat count', () => {
    render(
      <Marquee repeat={3}>
        <span>Item</span>
      </Marquee>,
    );
    expect(screen.getAllByText('Item')).toHaveLength(3);
  });

  it('applies the vertical animation class when vertical', () => {
    const { container } = render(
      <Marquee vertical>
        <span>V</span>
      </Marquee>,
    );
    expect(container.querySelector('.animate-marquee-vertical')).not.toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Marquee>
        <span>Sponsor</span>
      </Marquee>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
