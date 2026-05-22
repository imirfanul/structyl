import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as NavigationMenuModule from './';
import { renderNavigationMenuAxeFixture } from '../../test/axe-fixtures';

describe('NavigationMenu (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(NavigationMenuModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderNavigationMenuAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
