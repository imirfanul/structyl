import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio primitive', () => {
  it('renders children and preserves the ratio', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9} data-testid="ar">
        <div data-testid="child">hello</div>
      </AspectRatio>,
    );
    const outer = container.querySelector('[data-testid="ar"]') as HTMLElement | null;
    expect(outer).not.toBeNull();
    const spacer = outer?.firstElementChild as HTMLElement | null;
    expect(spacer).not.toBeNull();
    // padding-top for 16:9 should be ~56.25%
    expect(spacer?.style.paddingTop).toBe('56.25%');
  });
});
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
