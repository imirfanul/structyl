import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ResizableModule from './';
import { renderResizableAxeFixture } from '../../test/axe-fixtures';

describe('Resizable (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ResizableModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderResizableAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
