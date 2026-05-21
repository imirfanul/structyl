import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Accordion from './';

describe('Accordion (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Accordion);
    expect(keys.length).toBeGreaterThan(0);
  });

  it.skip('has no accessibility violations in default render', async () => {
    // TODO: add a representative default render once test fixtures are written.
    const { container } = render(<div />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
