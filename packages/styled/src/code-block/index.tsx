'use client';

import * as React from 'react';
import { cn } from '@structyl/utils';
import { CopyButton } from '../copy-button';

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLPreElement>, 'children'> {
  /** The raw source code to display. */
  code: string;
  /** Optional language label shown in the header. */
  language?: string;
  /** Optional filename shown in the header. */
  filename?: string;
  /** Show line numbers in a gutter. */
  showLineNumbers?: boolean;
  /** Show the copy-to-clipboard button. Defaults to true. */
  copyable?: boolean;
  /** 1-based line numbers to highlight. */
  highlightLines?: number[];
}

/**
 * A presentational code block with an optional filename/language header, line
 * numbers, and a built-in copy button. No syntax highlighting — pair with a
 * highlighter (e.g. shiki) downstream if desired by passing pre-rendered children.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  (
    {
      className,
      code,
      language,
      filename,
      showLineNumbers = false,
      copyable = true,
      highlightLines = [],
      ...props
    },
    ref,
  ) => {
    const lines = React.useMemo(() => code.replace(/\n$/, '').split('\n'), [code]);
    const highlightSet = React.useMemo(() => new Set(highlightLines), [highlightLines]);
    const hasHeader = Boolean(filename || language);

    return (
      <div className={cn('overflow-hidden rounded-lg border bg-muted/30', className)}>
        {hasHeader && (
          <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">{filename ?? language}</span>
            {copyable && <CopyButton value={code} className="h-7 w-7" />}
          </div>
        )}
        <div className="relative">
          {!hasHeader && copyable && (
            <CopyButton value={code} className="absolute right-2 top-2 z-10 h-7 w-7" />
          )}
          <pre
            ref={ref}
            className={cn('overflow-x-auto p-4 text-sm leading-relaxed', !hasHeader && copyable && 'pr-12')}
            {...props}
          >
            <code className="font-mono">
              {lines.map((line, i) => {
                const lineNo = i + 1;
                const highlighted = highlightSet.has(lineNo);
                return (
                  <span
                    key={i}
                    className={cn(
                      'grid',
                      showLineNumbers && 'grid-cols-[auto_1fr] gap-4',
                      highlighted && '-mx-4 bg-primary/10 px-4',
                    )}
                  >
                    {showLineNumbers && (
                      <span className="select-none text-right text-muted-foreground/60" aria-hidden>
                        {lineNo}
                      </span>
                    )}
                    <span>{line || ' '}</span>
                  </span>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    );
  },
);
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
