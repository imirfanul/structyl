# @structyl/forms

Headless, schema-driven forms for React — built from scratch, zero runtime dependencies beyond structyl.

- **Chainable validator** (`v.string().required().email()`) — no zod, no external schema lib.
- **`useForm` reactive engine** — controlled + uncontrolled, slice-level subscriptions via `useSyncExternalStore`, SSR-safe.
- **`Form` / `Field` components** — composed over structyl's accessible `Form.*` primitives (labels, ARIA, messages handled for you).

## Install

```bash
pnpm add @structyl/forms
```

## Quick start

```tsx
import { useForm, Form, Field, v } from '@structyl/forms';

const schema = {
  email: v.string().required().email(),
  password: v.string().required().minLength(8),
};

function LoginForm() {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    schema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <Form form={form}>
      <Field name="email" label="Email" type="email" placeholder="you@example.com" />
      <Field name="password" label="Password" type="password" />
      <button type="submit" disabled={form.isSubmitting}>Sign in</button>
    </Form>
  );
}
```

## Validators

`v.string()`, `v.number()`, `v.boolean()`, `v.date()`, `v.array(item)`, `v.object(shape)`, and
`v.custom(fn)` for the plain-function escape hatch. Every builder method takes an optional
custom message; `.optional()` short-circuits empty values as valid.

```ts
v.string().required().min(3).max(20).pattern(/^[a-z]+$/);
v.number().int().min(0).max(100);
v.boolean().isTrue('You must accept the terms');
v.custom((value, ctx) => value === ctx.values.password || 'Passwords must match');
```

More methods — string: `nonempty`, `length`, `startsWith`, `endsWith`, `includes`, `uuid`,
`numeric`, `trim`, `toLowerCase`, `toUpperCase`. Number: `between`, `nonnegative`,
`nonpositive`, `safe`, `step`, `coerce`.

`email()` is configurable:

```ts
v.string().email();                                  // default RFC-lite check
v.string().email('Enter a valid email');             // custom message
v.string().email({ requireTld: false });             // allow ada@localhost
v.string().email({ allowDisplayName: true });        // "Ada <ada@x.com>"
v.string().email({ blocklist: ['mailinator.com'] }); // reject disposable domains
v.string().email({ allowlist: ['company.com'] });    // only this domain
v.string().email({ pattern: /your-regex/ });         // bring your own
```

### Defaults, null & transforms

Every validator supports value options. `.default()` and `.coerce()`/`.transform()` fill or
convert the value on read (`form.values`) and on submit:

```ts
const schema = {
  role: v.string().default('user'),                  // empty → 'user'
  age: v.number().coerce().int().min(18),            // "18" (string) → 18, then validate
  website: v.string().url().nullable(),              // null allowed
  username: v.string().trim().toLowerCase().min(3),  // transform before storing
};
```

- `.optional()` — empty (`''` / `undefined`) skips validation.
- `.nullable()` — `null` is allowed.
- `.default(value)` — fills empty values (value or factory function), zod-style.
- `.coerce()` — convert raw input to the target type before validating.
- `.transform(fn)` — map the value before it is stored/validated.

## Custom inputs

Use `<Controller>` (or `useField`) to bind non-native inputs like Select or DatePicker:

```tsx
import { Controller } from '@structyl/forms';
import { Select } from '@structyl/styled';

<Controller name="country" render={({ field }) => (
  <Select value={field.value} onValueChange={field.onChange} />
)} />
```

## Dynamic lists — `useFieldArray`

Manage repeatable fields with stable keys and the usual array operations:

```tsx
import { useForm, Form, useFieldArray } from '@structyl/forms';

function ContactsForm() {
  const form = useForm({ defaultValues: { contacts: [{ email: '' }] } });
  return (
    <Form form={form}>
      <Contacts />
    </Form>
  );
}

function Contacts() {
  const { fields, append, remove, move } = useFieldArray('contacts');
  return (
    <>
      {fields.map((field, i) => (
        <input key={field.id} {...form.register(`contacts[${i}].email`)} />
      ))}
      <button type="button" onClick={() => append({ email: '' })}>Add</button>
    </>
  );
}
```

`useFieldArray` returns `{ fields, append, prepend, insert, remove, swap, move, update, replace }`. Each `field` has a stable `id` for use as a React `key`.

## Watching & reading

```tsx
import { useWatch } from '@structyl/forms';

const country = useWatch('country');      // re-renders only when `country` changes
form.getValues('country');                // imperative read, no subscription
form.watch('country');                    // same as getValues (imperative)
```

## Multi-step wizards

The store holds **all** values across every step, so data persists between steps automatically. Validate only the current step with `trigger`, and survive refresh with `useFormPersist`:

```tsx
import { useForm, useFormPersist } from '@structyl/forms';

function Wizard() {
  const form = useForm({ defaultValues: { /* all steps */ } });
  const { clear } = useFormPersist(form, 'signup', { storage: 'session', exclude: ['password'] });

  const nextStep = async () => {
    // validate ONLY this step's fields
    if (await form.trigger(['email', 'username'])) goToNextStep();
  };

  const onFinish = form.handleSubmit((values) => {
    submit(values);
    clear(); // drop the saved draft
  });
}
```

`form.trigger(names?)` (alias of `validate`) accepts a single name or an array. `useFormPersist` auto-saves to `localStorage`/`sessionStorage` with `include`/`exclude` filters and returns `clear()`.

## External schemas (zod / yup / Standard Schema)

Bring your own schema library — no dependency is added:

```tsx
import { useForm, zodResolver } from '@structyl/forms';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });
const form = useForm({ schema: zodResolver(schema) });
```

Adapters: `zodResolver`, `yupResolver`, and `standardSchemaResolver` (valibot, arktype, …).

## Other state & helpers

- `form.dirtyFields` — per-field changed map; `form.isDirty` — whole-form flag.
- `form.isValidating` — true while async validation is in flight.
- `form.setFocus(name)` — focus a registered field.
- `validateDebounce` option — debounce onChange validation (great for async rules).

## License

MIT
