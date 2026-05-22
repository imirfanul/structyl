import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as DialogModule from './';
import { renderDialogAxeFixture } from '../../test/axe-fixtures';

describe('Dialog (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DialogModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDialogAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
