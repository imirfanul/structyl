import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { CodeBlock } from './index';

const SAMPLE = `const a = 1;\nconst b = 2;\nconsole.log(a + b);`;

describe('CodeBlock (styled)', () => {
  it('renders each line of code', () => {
    const { container } = render(<CodeBlock code={SAMPLE} />);
    expect(container.querySelector('pre')).not.toBeNull();
    expect(screen.getByText('const a = 1;')).toBeDefined();
    expect(screen.getByText('console.log(a + b);')).toBeDefined();
  });

  it('shows a header with filename', () => {
    render(<CodeBlock code={SAMPLE} filename="example.ts" />);
    expect(screen.getByText('example.ts')).toBeDefined();
  });

  it('renders line numbers when enabled', () => {
    render(<CodeBlock code={SAMPLE} showLineNumbers />);
    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
  });

  it('omits the copy button when copyable is false', () => {
    render(<CodeBlock code={SAMPLE} copyable={false} filename="x.ts" />);
    expect(screen.queryByRole('button', { name: /copy/i })).toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CodeBlock code={SAMPLE} filename="example.ts" showLineNumbers />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
