# Accessibility

Accessibility is **non-negotiable** in this library. This document explains our standards and how to meet them.

---

## Our standards

| Standard | Target |
|---|---|
| **WCAG 2.2** | Level AA (Level AAA where feasible) |
| **WAI-ARIA APG** | Source of truth for component patterns |
| **Keyboard** | All interactions reachable without a mouse |
| **Screen readers** | Tested with NVDA, JAWS, VoiceOver, TalkBack |
| **Color contrast** | 4.5:1 for text, 3:1 for UI |
| **Focus indicators** | Visible, 2px minimum, 3:1 contrast |
| **Motion** | Respect `prefers-reduced-motion` |
| **Touch targets** | Minimum 44×44 CSS pixels |

---

## Per-component requirements

Every component MUST:

1. Use semantic HTML where possible (`<button>`, `<input>`, etc.)
2. Have correct `role` if not using a semantic element
3. Manage `tabIndex` appropriately
4. Have ARIA labels (via `aria-label` or `aria-labelledby`)
5. Announce state changes when relevant (via `aria-live` or `data-state`)
6. Trap focus inside modals (Dialog, AlertDialog, Sheet)
7. Restore focus on close
8. Support keyboard shortcuts per WAI-ARIA APG
9. Handle disabled state correctly (`aria-disabled` vs `disabled`)
10. Support RTL layout

---

## Testing

### Automated (every PR)

```bash
pnpm test:a11y
```

Runs **axe-core** on every component in every state. **Zero violations** is required to merge.

### Manual checklist (before release)

For every component changed in a release:

- [ ] Tab through with keyboard only — all interactions work?
- [ ] Test with NVDA (Windows) — all states announced?
- [ ] Test with VoiceOver (macOS) — same?
- [ ] Test with screen magnifier — focus indicators visible?
- [ ] Test at 200% zoom — layout holds?
- [ ] Test with `prefers-reduced-motion` — animations gracefully degrade?
- [ ] Test in high-contrast mode (Windows)
- [ ] Test in dark mode + light mode

---

## Common patterns

### Labels

```tsx
// ✅ Visible label
<Label htmlFor="email">Email</Label>
<Input id="email" />

// ✅ Hidden label (when visual label would be redundant)
<Input aria-label="Search" />

// ✅ Label as wrapping element
<Label>Email <Input /></Label>
```

### Required fields

```tsx
<Label htmlFor="email">
  Email <span aria-hidden="true">*</span>
</Label>
<Input id="email" required aria-required="true" />
```

### Error states

```tsx
<Input
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && <p id="email-error" role="alert">Invalid email</p>}
```

### Loading states

```tsx
<Button aria-busy={loading} disabled={loading}>
  {loading ? <Spinner aria-label="Loading" /> : 'Submit'}
</Button>
```

### Live regions

```tsx
// For status updates
<div role="status" aria-live="polite">
  3 items in cart
</div>

// For urgent alerts
<div role="alert" aria-live="assertive">
  Save failed
</div>
```

---

## Focus management

### When to trap focus

Trap focus when content is *modal* — overlays the page:
- Dialog, AlertDialog, Sheet, Drawer
- Full-page menus

Do NOT trap focus in:
- Popover, Tooltip, HoverCard, DropdownMenu (these are non-modal)

### When to restore focus

Always restore focus to the trigger after dismissal:

```tsx
const triggerRef = useRef<HTMLButtonElement>(null);

const handleClose = () => {
  setOpen(false);
  triggerRef.current?.focus();
};
```

This is handled by `FocusScope` automatically — use it instead of rolling your own.

### Focus visible

We use `:focus-visible` instead of `:focus` for visual indicators. This ensures keyboard users see focus rings while mouse users don't get unwanted halos.

```css
.button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

---

## Motion & animation

### `prefers-reduced-motion`

All animations respect the user's motion preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Tailwind has the `motion-reduce:` and `motion-safe:` modifiers — use them:

```tsx
<div className="motion-safe:animate-spin motion-reduce:animate-none" />
```

### Pause animations on focus

If a carousel auto-rotates, pause on focus or hover. Never auto-rotate things that change context.

---

## Color & contrast

### Don't rely on color alone

Bad:
```tsx
<span className="text-red-500">Error</span>
```

Good:
```tsx
<span className="text-destructive">
  <Icon name="alert" aria-hidden="true" /> Error
</span>
```

### Theme tokens are pre-audited

All built-in themes meet WCAG AA contrast ratios for their semantic pairs (`bg`/`fg`, `primary`/`primary-fg`, etc.). If you create a custom theme, run the theme generator's contrast checker.

---

## RTL support

All components use logical CSS properties (`ms-2` not `ml-2`, `start-0` not `left-0`). The `DirectionProvider` from `@aura-ui/core` sets the document direction.

```tsx
<DirectionProvider dir="rtl">
  <App />
</DirectionProvider>
```

---

## Resources

- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [NVDA](https://www.nvaccess.org/)
- [A11y Project checklist](https://www.a11yproject.com/checklist/)
