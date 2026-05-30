import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Stat, StatGroup, TrendBadge } from './index';

describe('Stat (styled)', () => {
  it('renders label and value', () => {
    render(<Stat label="Total users" value="2,491" />);
    expect(screen.getByText('Total users')).toBeDefined();
    expect(screen.getByText('2,491')).toBeDefined();
  });

  it('renders optional description', () => {
    render(<Stat label="Revenue" value="$12k" description="This month" />);
    expect(screen.getByText('This month')).toBeDefined();
  });

  it('renders trend information', () => {
    render(<Stat label="Growth" value="18%" trend="+3.2%" trendDirection="up" />);
    expect(screen.getByText('+3.2%')).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Stat label="Active sessions" value="148" trend="+12%" trendDirection="up" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe('StatGroup (styled)', () => {
  it('renders multiple stats', () => {
    render(
      <StatGroup>
        <Stat label="Users" value="100" />
        <Stat label="Revenue" value="$5k" />
      </StatGroup>,
    );
    expect(screen.getByText('Users')).toBeDefined();
    expect(screen.getByText('Revenue')).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <StatGroup columns={2}>
        <Stat label="A" value="1" />
        <Stat label="B" value="2" />
      </StatGroup>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe('TrendBadge (styled)', () => {
  it('renders value', () => {
    render(<TrendBadge value="+8%" direction="up" />);
    expect(screen.getByText('+8%')).toBeDefined();
  });
});
