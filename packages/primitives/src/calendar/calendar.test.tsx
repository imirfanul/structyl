import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as CalendarModule from './';
import { renderCalendarAxeFixture } from '../../test/axe-fixtures';

describe('Calendar (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(CalendarModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderCalendarAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
