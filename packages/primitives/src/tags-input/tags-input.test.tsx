import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as TagsInputModule from './';
import { renderTagsInputAxeFixture } from '../../test/axe-fixtures';

describe('TagsInput (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(TagsInputModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderTagsInputAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
