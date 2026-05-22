import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as FileUploadModule from './';
import { renderFileUploadAxeFixture } from '../../test/axe-fixtures';

describe('FileUpload (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(FileUploadModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderFileUploadAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
