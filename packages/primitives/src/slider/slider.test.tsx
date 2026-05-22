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
