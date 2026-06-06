# @structyl/forms

## 0.2.0

### Minor Changes

- 0722e30: Add `@structyl/forms` — a headless, schema-driven forms package built from scratch with zero runtime dependencies beyond structyl.
  - **Chainable validator** via the `v` namespace (`v.string().required().email()`, `v.number().int().min()`, `v.boolean().isTrue()`, `v.date()`, `v.array()`, `v.object()`, plus `v.custom()` for plain-function rules). No zod, no external schema lib.
  - **`useForm` reactive engine** — controlled + uncontrolled, slice-level subscriptions via `useSyncExternalStore`, SSR-safe, with `register`, `handleSubmit`, `setValue`, `setError`, `reset`, `getFieldState`, and dirty/touched/submitCount tracking.
  - **`Form` / `Field` / `Controller` / `ErrorMessage` components** composed over structyl's accessible `Form.*` primitives — labels, ARIA wiring, and messages handled for you.
  - **`useFieldArray`** for dynamic lists — `fields` with stable keys plus `append`, `prepend`, `insert`, `remove`, `swap`, `move`, `update`, `replace`.
  - **`useWatch`** for scoped field subscriptions and **`getValues`/`watch`** for imperative reads without re-rendering the whole form.
  - **`trigger`** and **step-scoped `validate(['a','b'])`** (validate just a wizard step), plus **`setFocus`**, per-field **`dirtyFields`**, and **`isValidating`** state.
  - **`useFormPersist`** — auto-save/restore form values to `localStorage`/`sessionStorage` with `include`/`exclude` and `clear()`, ideal for multi-step wizards that must survive refresh.
  - **Async validation debounce** (`validateDebounce`) and **resolver adapters** (`zodResolver`, `yupResolver`, `standardSchemaResolver`) to plug in external schemas without adding a dependency.
  - **Schema value options** on every validator: `.optional()` (empty OK), `.nullable()` (null OK), `.default(value)` (fills empty values on read & submit, zod-style), `.transform(fn)`, and `.coerce()` (string→number/boolean/date). Custom error messages on every rule.
  - **More validator methods** — number: `between`, `nonnegative`, `nonpositive`, `safe`, `step`; string: `nonempty`, `length`, `startsWith`, `endsWith`, `includes`, `uuid`, `numeric`, `trim`, `toLowerCase`, `toUpperCase`.
  - **Configurable `email()`** — `email()`, `email('message')`, or `email({ pattern, allowDisplayName, requireTld, blocklist, allowlist, message })` to control TLD requirement, display-name form, custom regex, and domain allow/block lists.

### Patch Changes

- Updated dependencies [0722e30]
- Updated dependencies [0722e30]
- Updated dependencies [0722e30]
  - @structyl/hooks@1.1.0
  - @structyl/utils@1.1.0
  - @structyl/styled@1.2.0
  - @structyl/primitives@1.1.1
