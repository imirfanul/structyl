'use client';

import * as React from 'react';
import { highlight } from 'sugar-high';
import { Check, Copy } from '@structyl/icons';

/* ──────────────────────────────────────────────────────────────────────────
   CodeBlock — editor-style code surface used across the docs.

   Renders syntax-highlighted code (via sugar-high) inside a window chrome with
   a language label, copy-to-clipboard button, and an optional line-number
   gutter. The dark surface (#0d1117) is intentional and constant across the
   site's light/dark modes so code always reads like an editor.

   The highlighted markup is injected with dangerouslySetInnerHTML. This is safe
   here: the input is always a trusted, build-time code string from the docs
   registry (never user input), and sugar-high HTML-escapes the source text
   before emitting token <span>s.
   ────────────────────────────────────────────────────────────────────────── */

export type CodeBlockProps = {
  code: string;
  lang?: string;
  /** Show a line-number gutter. Off by default for short snippets. */
  lineNumbers?: boolean;
  /** Corner rounding — `bottom` when stacked under a tab bar. */
  rounded?: 'all' | 'bottom' | 'none';
  /** Show the macOS-style traffic-light dots in the header. */
  chrome?: boolean;
  /** Optional filename shown next to the dots. */
  filename?: string;
  className?: string;
};

export function CodeBlock({
  code,
  lang = 'tsx',
  lineNumbers = false,
  rounded = 'all',
  chrome = false,
  filename,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const html = React.useMemo(() => highlight(code), [code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  const roundedCls =
    rounded === 'bottom'
      ? 'rounded-b-xl border-t-0'
      : rounded === 'none'
        ? ''
        : 'rounded-xl';

  return (
    <div
      className={`group relative border border-border bg-[#0d1117] ${roundedCls} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
        {chrome && (
          <div className="flex gap-1.5">
            <span className="size-[10px] rounded-full bg-[#ff5f57]" />
            <span className="size-[10px] rounded-full bg-[#febc2e]" />
            <span className="size-[10px] rounded-full bg-[#28c840]" />
          </div>
        )}
        {filename ? (
          <span className="font-mono text-[11px] text-white/50">{filename}</span>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/35">
            {lang}
          </span>
        )}
        <button
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="ml-auto flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-white/50 opacity-0 transition-all hover:bg-white/10 hover:text-white/90 focus-visible:opacity-100 group-hover:opacity-100"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        <code
          className="sh-code"
          data-line-numbers={lineNumbers ? 'true' : undefined}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}
