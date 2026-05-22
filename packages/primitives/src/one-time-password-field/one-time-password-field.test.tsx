import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as OneTimePasswordFieldModule from './';
import { renderOneTimePasswordFieldAxeFixture } from '../../test/axe-fixtures';

describe('OneTimePasswordField (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(OneTimePasswordFieldModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderOneTimePasswordFieldAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
