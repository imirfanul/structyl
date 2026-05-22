import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as CarouselModule from './';
import { renderCarouselAxeFixture } from '../../test/axe-fixtures';

describe('Carousel (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(CarouselModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderCarouselAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
