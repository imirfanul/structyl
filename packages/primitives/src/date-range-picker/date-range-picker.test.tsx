import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as DateRangePickerModule from './';
import { renderDateRangePickerAxeFixture } from '../../test/axe-fixtures';

describe('DateRangePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DateRangePickerModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDateRangePickerAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
