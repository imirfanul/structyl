'use client';

import * as React from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   useNoAutofill — defeats Chrome's aggressive autofill on search inputs.

   Chrome ignores autoComplete="off" and the data-*-ignore hints and will still
   prefill a lone text field with a saved email/contact on load. The one trick
   it respects is `readonly`: a readonly field is never autofilled. So we render
   the input readOnly until the user focuses it, then flip it editable.

   Spread the returned props onto the <Input>:
     const noAutofill = useNoAutofill();
     <Input {...noAutofill} value={q} onChange={...} />
   ────────────────────────────────────────────────────────────────────────── */
export function useNoAutofill() {
  const [readOnly, setReadOnly] = React.useState(true);

  return {
    readOnly,
    // Flip editable the moment the user interacts. onFocus covers keyboard +
    // click; onPointerDown covers the brief gap before focus on some browsers.
    onFocus: () => setReadOnly(false),
    onPointerDown: () => setReadOnly(false),
    // Standard soft hints (kept as defence-in-depth; harmless if ignored).
    autoComplete: 'off' as const,
    autoCorrect: 'off',
    autoCapitalize: 'off',
    spellCheck: false,
    'data-1p-ignore': true,
    'data-lpignore': 'true',
    'data-form-type': 'other',
  };
}
