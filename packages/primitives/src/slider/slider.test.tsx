'use client';

import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Root, Track, Range, Thumb } from './index';

describe('Slider (primitive)', () => {
  it('renders thumbs and track', () => {
    const { getAllByRole } = render(
      <Root>
        <Track>
          <Range />
        </Track>
        <Thumb />
      </Root>,
    );
    const sliders = getAllByRole('slider', { hidden: true });
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Root>
        <Track>
          <Range />
        </Track>
        <Thumb />
      </Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Slider from './';
import { renderSliderAxeFixture } from '../../test/axe-fixtures';

describe('Slider (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Slider);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderSliderAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
