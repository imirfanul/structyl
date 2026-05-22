import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ToastModule from './';
import { renderToastAxeFixture } from '../../test/axe-fixtures';

describe('Toast (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ToastModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderToastAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
