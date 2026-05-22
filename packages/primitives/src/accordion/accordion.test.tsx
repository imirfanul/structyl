import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Accordion from './';
import { renderAccordionAxeFixture } from '../../test/axe-fixtures';

describe('Accordion (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Accordion);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderAccordionAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
