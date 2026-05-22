import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as CommandModule from './';
import { renderCommandAxeFixture } from '../../test/axe-fixtures';

describe('Command (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(CommandModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderCommandAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
