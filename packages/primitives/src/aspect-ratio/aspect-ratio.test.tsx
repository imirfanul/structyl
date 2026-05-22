import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as AspectRatioModule from './';
import { renderAspectRatioAxeFixture } from '../../test/axe-fixtures';

describe('AspectRatio (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(AspectRatioModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderAspectRatioAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
