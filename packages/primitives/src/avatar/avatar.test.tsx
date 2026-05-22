import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Avatar from './';
import { renderAvatarAxeFixture } from '../../test/axe-fixtures';

describe('Avatar (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Avatar);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderAvatarAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
