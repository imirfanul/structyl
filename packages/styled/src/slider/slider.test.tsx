'use client';

import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Slider } from './index';

describe('Slider (styled)', () => {
  it('renders without errors', () => {
    const { getAllByRole } = render(<Slider />);
    const sliders = getAllByRole('slider', { hidden: true });
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Slider />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
