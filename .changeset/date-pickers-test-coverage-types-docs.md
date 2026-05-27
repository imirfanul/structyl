---
"@aura-ui/primitives": patch
"@aura-ui/styled": patch
---

Add comprehensive test coverage, standalone types files, co-located docs, and expanded Storybook stories for all four date/time picker components.

- `DatePicker`, `TimePicker`, `DateRangePicker`, `DateTimePicker` — new `*.types.ts` files expose all public prop interfaces as named exports
- Primitive test suites expanded: controlled/uncontrolled state, keyboard navigation (ArrowUp/Down on segments), `onError` validation callbacks, `readOnly`/`disabled` guards, loading state, `onAccept`/`onValueChange`, shortcut selection
- Styled test suites expanded: disabled/readOnly states, `onAccept`, loading, helper text, placeholder, custom format, AM/PM clock, seconds view, range shortcuts
- Co-located `*.docs.mdx` files added inside each primitive component folder
- Storybook stories expanded to cover: Controlled, Disabled, ReadOnly, WithMinMax, DisablePastFuture, Loading, CustomFormat, WithValidationError, CompoundAPI, AMPM, TwentyFourHour, WithSeconds, NoShortcuts, TwoCalendars, WithCustomShortcuts variants
- TimePicker: silent `void [...]` on reserved props replaced with typed `satisfies unknown[]` and inline documentation of intent for each prop
