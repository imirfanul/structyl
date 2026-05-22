import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as LabelModule from './';
import { renderLabelAxeFixture } from '../../test/axe-fixtures';

describe('Label (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(LabelModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderLabelAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
