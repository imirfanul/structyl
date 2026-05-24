import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as DateTimePickerModule from './';
import { renderDateTimePickerAxeFixture } from '../../test/axe-fixtures';

describe('DateTimePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DateTimePickerModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDateTimePickerAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
