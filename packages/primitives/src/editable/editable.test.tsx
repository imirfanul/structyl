import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as EditableModule from './';
import { renderEditableAxeFixture } from '../../test/axe-fixtures';

describe('Editable (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(EditableModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderEditableAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
