import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as AlertDialogModule from './';
import { renderAlertDialogAxeFixture } from '../../test/axe-fixtures';

describe('AlertDialog (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(AlertDialogModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderAlertDialogAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
