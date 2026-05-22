import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as MenubarModule from './';
import { renderMenubarAxeFixture } from '../../test/axe-fixtures';

describe('Menubar (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(MenubarModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderMenubarAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
