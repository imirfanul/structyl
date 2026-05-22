import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as TimePickerModule from './';
import { renderTimePickerAxeFixture } from '../../test/axe-fixtures';

describe('TimePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(TimePickerModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderTimePickerAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
