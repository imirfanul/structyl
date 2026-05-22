import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ColorPickerModule from './';
import { renderColorPickerAxeFixture } from '../../test/axe-fixtures';

describe('ColorPicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ColorPickerModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderColorPickerAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
