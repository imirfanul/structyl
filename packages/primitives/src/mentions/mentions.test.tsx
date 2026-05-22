import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as MentionsModule from './';
import { renderMentionsAxeFixture } from '../../test/axe-fixtures';

describe('Mentions (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(MentionsModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderMentionsAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
