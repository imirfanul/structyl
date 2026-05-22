import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as RadioGroup from './';
import { renderRadioGroupAxeFixture } from '../../test/axe-fixtures';

describe('RadioGroup (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(RadioGroup);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderRadioGroupAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
