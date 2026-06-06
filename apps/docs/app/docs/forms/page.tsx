'use client';

import * as React from 'react';
import { Box, Button, Input, Typography, Checkbox, Label, Badge, Table } from '@structyl/styled';
import {
  useForm,
  Form,
  Field,
  Controller,
  useFieldArray,
  FormProvider,
  v,
} from '@structyl/forms';
import { CodeBlock } from '../../../components/code-block';

/* ── Shared preview shell (mirrors the api-client docs page) ───────────────── */

function PreviewBlock({
  title,
  description,
  children,
  code,
  lang = 'tsx',
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  lang?: string;
}) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  return (
    <Box className="mt-4">
      {title && (
        <Typography as="h4" variant="h4" className="mb-2 text-sm font-semibold">
          {title}
        </Typography>
      )}
      {description && (
        <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">
          {description}
        </Typography>
      )}
      <Box className="flex items-center border-b border-border">
        {(['preview', 'code'] as const).map((t) => (
          <Button
            variant="ghost"
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-3 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t ? 'text-fg' : 'text-muted-foreground hover:text-fg'
            }`}
          >
            {t}
            {tab === t && (
              <Box className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
          </Button>
        ))}
      </Box>
      {tab === 'preview' ? (
        <Box className="overflow-hidden rounded-b-xl border border-t-0 border-border bg-gradient-to-br from-accent/20 to-transparent p-8">
          {children}
        </Box>
      ) : (
        <CodeBlock code={code} lang={lang} rounded="bottom" />
      )}
    </Box>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Box id={id} className="scroll-mt-24 pt-10">
      <Typography as="h2" variant="h2" className="mb-3 text-2xl font-bold tracking-tight">
        {title}
      </Typography>
      {children}
    </Box>
  );
}

/* ── Live demos ─────────────────────────────────────────────────────────────── */

interface LoginValues extends Record<string, unknown> {
  email: string;
  password: string;
  terms: boolean;
}

function LoginDemo() {
  const [submitted, setSubmitted] = React.useState<string | null>(null);
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '', terms: false },
    mode: 'onBlur',
    schema: {
      email: v.string().required().email(),
      password: v.string().required().minLength(8),
      terms: v.boolean().isTrue('You must accept the terms'),
    },
    onSubmit: (values) => setSubmitted(`Submitted: ${values.email}`),
  });

  return (
    <Form form={form} className="w-full max-w-sm">
      <Field name="email" label="Email" type="email" placeholder="you@example.com" />
      <Field name="password" label="Password" type="password" placeholder="••••••••" />
      <Controller
        name="terms"
        render={({ field, fieldState }) => (
          <Box className="flex flex-col gap-1">
            <Box className="flex items-center gap-2">
              <Checkbox
                checked={Boolean(field.value)}
                onCheckedChange={(c) => field.onChange(Boolean(c))}
                onBlur={field.onBlur}
                id="terms"
              />
              <Label htmlFor="terms" className="text-sm">
                I accept the terms
              </Label>
            </Box>
            {fieldState.touched && fieldState.error && (
              <Typography as="span" variant="body2" className="text-xs text-destructive">
                {fieldState.error}
              </Typography>
            )}
          </Box>
        )}
      />
      <Button type="submit" disabled={form.isSubmitting} className="mt-1">
        Sign in
      </Button>
      {submitted && <Typography variant="body2" className="text-success">{submitted}</Typography>}
    </Form>
  );
}

const LOGIN_CODE = `import { useForm, Form, Field, Controller, v } from '@structyl/forms';
import { Button, Checkbox, Label } from '@structyl/styled';

const schema = {
  email: v.string().required().email(),
  password: v.string().required().minLength(8),
  terms: v.boolean().isTrue('You must accept the terms'),
};

export default function LoginForm() {
  const form = useForm({
    defaultValues: { email: '', password: '', terms: false },
    mode: 'onBlur',
    schema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <Form form={form}>
      <Field name="email" label="Email" type="email" placeholder="you@example.com" />
      <Field name="password" label="Password" type="password" />
      <Controller
        name="terms"
        render={({ field, fieldState }) => (
          <>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" />
            <Label htmlFor="terms">I accept the terms</Label>
            {fieldState.touched && fieldState.error && <span>{fieldState.error}</span>}
          </>
        )}
      />
      <Button type="submit" disabled={form.isSubmitting}>Sign in</Button>
    </Form>
  );
}`;

interface SignupValues extends Record<string, unknown> {
  username: string;
  age: number | undefined;
}

function ValidationModeDemo() {
  const form = useForm<SignupValues>({
    defaultValues: { username: '', age: undefined },
    mode: 'onChange',
    schema: {
      username: v.string().required().minLength(3).pattern(/^[a-z0-9_]+$/, 'Lowercase, digits, and _ only'),
      age: v.number().required().int().min(13, 'Must be at least 13'),
    },
  });

  return (
    <Box className="w-full max-w-sm">
      <Form form={form}>
        <Field name="username" label="Username" placeholder="ada_lovelace" />
        <Field name="age" label="Age" type="number" placeholder="18" />
      </Form>
      <Box className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-xs font-mono">
        valid: {String(form.isValid)} · dirty: {String(form.isDirty)}
      </Box>
    </Box>
  );
}

const MODE_CODE = `const form = useForm({
  mode: 'onChange', // validate as the user types
  schema: {
    username: v.string().required().minLength(3).pattern(/^[a-z0-9_]+$/),
    age: v.number().required().int().min(13),
  },
});

// form.isValid · form.isDirty · form.errors · form.touched update live`;

/* ── Field array demo ─────────────────────────────────────────────────────── */

interface TeamValues extends Record<string, unknown> {
  members: { name: string }[];
}

function FieldArrayInner({ form }: { form: ReturnType<typeof useForm<TeamValues>> }) {
  const { fields, append, remove, move } = useFieldArray<{ name: string }>('members');
  return (
    <Box className="w-full max-w-sm space-y-2">
      {fields.map((field, i) => (
        <Box key={field.id} className="flex items-center gap-2">
          <Input
            placeholder={`Member ${i + 1}`}
            value={(field.value?.name as string) ?? ''}
            onChange={(e) => form.setValue(`members[${i}].name`, e.target.value)}
          />
          <Button type="button" variant="ghost" size="sm" onClick={() => move(i, Math.max(0, i - 1))} disabled={i === 0}>
            ↑
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
            ✕
          </Button>
        </Box>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '' })}>
        + Add member
      </Button>
    </Box>
  );
}

function FieldArrayDemo() {
  const form = useForm<TeamValues>({ defaultValues: { members: [{ name: 'Ada' }] } });
  return (
    <FormProvider form={form}>
      <FieldArrayInner form={form} />
    </FormProvider>
  );
}

const FIELD_ARRAY_CODE = `import { useForm, FormProvider, useFieldArray } from '@structyl/forms';

function Team() {
  const form = useForm({ defaultValues: { members: [{ name: '' }] } });
  return (
    <FormProvider form={form}>
      <Members />
    </FormProvider>
  );
}

function Members() {
  const { fields, append, remove, move } = useFieldArray('members');
  return (
    <>
      {fields.map((field, i) => (
        <div key={field.id}>
          <input {...form.register(\`members[\${i}].name\`)} />
          <button onClick={() => move(i, i - 1)}>↑</button>
          <button onClick={() => remove(i)}>✕</button>
        </div>
      ))}
      <button onClick={() => append({ name: '' })}>Add member</button>
    </>
  );
}`;

/* ── Multi-step wizard demo ───────────────────────────────────────────────── */

interface WizardValues extends Record<string, unknown> {
  email: string;
  username: string;
  bio: string;
}

const WIZARD_STEPS: { label: string; fields: (keyof WizardValues & string)[] }[] = [
  { label: 'Account', fields: ['email'] },
  { label: 'Profile', fields: ['username'] },
  { label: 'About', fields: ['bio'] },
];

function WizardDemo() {
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const form = useForm<WizardValues>({
    defaultValues: { email: '', username: '', bio: '' },
    mode: 'onBlur',
    schema: {
      email: v.string().required().email(),
      username: v.string().required().minLength(3),
      bio: v.string().required().minLength(10),
    },
  });

  const next = async () => {
    // Validate ONLY the current step's fields — data for other steps stays in the form.
    const ok = await form.trigger(WIZARD_STEPS[step]!.fields);
    if (!ok) return;
    if (step < WIZARD_STEPS.length - 1) setStep((s) => s + 1);
    else form.handleSubmit(() => setDone(true))();
  };

  return (
    <Form form={form} className="w-full max-w-sm space-y-4">
      <Box className="flex items-center gap-2">
        {WIZARD_STEPS.map((s, i) => (
          <Badge key={s.label} variant={i === step ? 'default' : 'secondary'}>
            {s.label}
          </Badge>
        ))}
      </Box>

      {step === 0 && <Field name="email" label="Email" type="email" placeholder="you@example.com" />}
      {step === 1 && <Field name="username" label="Username" placeholder="ada_lovelace" />}
      {step === 2 && <Field name="bio" label="Bio" placeholder="Tell us about yourself…" />}

      <Box className="flex justify-between">
        <Button type="button" variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        <Button type="button" onClick={next}>
          {step === WIZARD_STEPS.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>

      {done && <Typography variant="body2" className="text-success">All set — {String(form.values.username)} registered!</Typography>}
    </Form>
  );
}

const WIZARD_CODE = `const form = useForm({ defaultValues: { email: '', username: '', bio: '' }, schema });

// The store holds ALL steps' data the whole time — switching steps never loses input.
const next = async () => {
  // validate ONLY the current step's fields
  if (await form.trigger(currentStep.fields)) {
    goToNextStep();
  }
};

// Persist across refresh (optional):
const { clear } = useFormPersist(form, 'signup', { storage: 'session' });
// on finish: form.handleSubmit(submit)(); clear();`;

/* ── Validator reference data ─────────────────────────────────────────────── */

const VALIDATORS: { builder: string; methods: string; description: string }[] = [
  { builder: 'v.string()', methods: 'required, nonempty, min, max, length, email, url, uuid, numeric, pattern, oneOf, startsWith, endsWith, includes, trim, toLowerCase, toUpperCase', description: 'String constraints + transforms.' },
  { builder: 'v.number()', methods: 'required, finite, min, max, between, int, safe, positive, negative, nonnegative, nonpositive, multipleOf, step, coerce', description: 'Numeric constraints.' },
  { builder: 'v.boolean()', methods: 'required, isTrue, isFalse, coerce', description: 'Boolean checks (e.g. accept terms).' },
  { builder: 'v.date()', methods: 'required, valid, min, max, after, before, coerce', description: 'Date constraints.' },
  { builder: 'v.array(item?)', methods: 'required, nonempty, min, max, eachItem', description: 'List constraints; pass an item validator for eachItem().' },
  { builder: 'v.object(shape)', methods: 'required, shapeValid', description: 'Nested object schemas.' },
  { builder: 'v.custom(fn)', methods: '—', description: 'Plain-function escape hatch; receives (value, ctx) with ctx.values for cross-field rules.' },
];

const VALUE_OPTIONS: { method: string; description: string }[] = [
  { method: '.optional()', description: 'Empty (‘’ / undefined) values skip validation.' },
  { method: '.nullable()', description: 'null is allowed (independent of optional).' },
  { method: '.default(value)', description: 'Fills empty values on read (form.values) and submit. Accepts a value or factory.' },
  { method: '.coerce()', description: 'Convert raw input to the target type (string→number/boolean/date) before validating.' },
  { method: '.transform(fn)', description: 'Map the value before it is stored/validated.' },
  { method: 'custom message', description: 'Every rule takes an optional last-argument message, e.g. .email(‘Invalid email’).' },
];

const USEFORM_API: { name: string; type: string; description: string }[] = [
  { name: 'values / errors / touched', type: 'object', description: 'Current reactive state.' },
  { name: 'isValid / isDirty / isSubmitting', type: 'boolean', description: 'Derived flags.' },
  { name: 'submitCount', type: 'number', description: 'How many times submit ran.' },
  { name: 'register(name, opts?)', type: 'fn', description: 'Binding for native inputs (name/onChange/onBlur/ref).' },
  { name: 'handleSubmit(onValid?, onInvalid?)', type: 'fn', description: 'Returns a form onSubmit handler.' },
  { name: 'setValue(name, value, opts?)', type: 'fn', description: 'Set a field; optionally validate/touch.' },
  { name: 'setError / clearErrors', type: 'fn', description: 'Imperative error control (e.g. server errors).' },
  { name: 'reset(next?)', type: 'fn', description: 'Reset to initial (or new) values.' },
  { name: 'validate(names?) / trigger(names?)', type: 'fn', description: 'Validate the whole form, one field, or a subset (a wizard step).' },
  { name: 'getFieldState(name)', type: 'fn', description: '{ value, error, touched, dirty, invalid }.' },
  { name: 'getValues(name?) / watch(name?)', type: 'fn', description: 'Read values imperatively without subscribing.' },
  { name: 'setFocus(name)', type: 'fn', description: 'Programmatically focus a registered field.' },
  { name: 'dirtyFields / isValidating', type: 'state', description: 'Per-field changed map; true while async validation runs.' },
];

export default function FormsPage() {
  return (
    <Box className="mx-auto max-w-3xl px-4 pb-24">
      <Box className="pt-10">
        <Typography as="span" variant="caption" className="text-xs font-semibold uppercase tracking-wider text-primary">
          Package
        </Typography>
        <Typography as="h1" variant="h1" className="mt-1 text-4xl font-extrabold tracking-tight">
          @structyl/forms
        </Typography>
        <Typography as="p" variant="body1" className="mt-3 text-lg text-muted-foreground">
          Headless, schema-driven forms — a from-scratch chainable validator, a <code>useForm</code> engine,
          and <code>Form</code>/<code>Field</code> components on structyl’s accessible primitives. No
          react-hook-form, no zod, no extra dependencies.
        </Typography>
      </Box>

      <Section id="installation" title="Installation">
        <CodeBlock lang="bash" code={`pnpm add @structyl/forms`} />
      </Section>

      <Section id="quick-start" title="Quick start">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          Define a schema with the <code>v</code> builder, wire it into <code>useForm</code>, and render
          fields. Labels, ARIA, and validation messages are handled by the accessible <code>Form.*</code>{' '}
          primitives.
        </Typography>
        <PreviewBlock title="Login form" code={LOGIN_CODE}>
          <Box className="flex justify-center">
            <LoginDemo />
          </Box>
        </PreviewBlock>
      </Section>

      <Section id="validation-modes" title="Validation modes">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          <code>mode</code> controls when validation runs: <code>onSubmit</code> (default), <code>onBlur</code>,{' '}
          <code>onChange</code>, or <code>all</code>. State like <code>isValid</code> and <code>isDirty</code>{' '}
          updates reactively.
        </Typography>
        <PreviewBlock title="Validate on change" code={MODE_CODE}>
          <Box className="flex justify-center">
            <ValidationModeDemo />
          </Box>
        </PreviewBlock>
      </Section>

      <Section id="validators" title="Validators">
        <Typography as="p" variant="body2" className="mb-4 text-muted-foreground">
          Every builder is chainable and immutable. Methods take an optional custom message;{' '}
          <code>.optional()</code> short-circuits empty values as valid.
        </Typography>
        <Box className="rounded-lg border border-border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Builder</Table.Head>
                <Table.Head>Methods</Table.Head>
                <Table.Head>Description</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {VALIDATORS.map((row) => (
                <Table.Row key={row.builder}>
                  <Table.Cell className="font-mono text-xs">{row.builder}</Table.Cell>
                  <Table.Cell className="font-mono text-xs text-muted-foreground">{row.methods}</Table.Cell>
                  <Table.Cell className="text-muted-foreground">{row.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Typography as="h4" variant="h4" className="mb-2 mt-6 text-sm font-semibold">
          Cross-field validation
        </Typography>
        <CodeBlock
          code={`const schema = {
  password: v.string().required().minLength(8),
  confirm: v.custom((value, ctx) =>
    value === ctx.values.password || 'Passwords must match'
  ),
};`}
        />
      </Section>

      <Section id="value-options" title="Defaults, null & transforms">
        <Typography as="p" variant="body2" className="mb-4 text-muted-foreground">
          Every validator supports these value options. <code>.default()</code> and{' '}
          <code>.coerce()</code>/<code>.transform()</code> fill or convert the value on read
          (<code>form.values</code>) and on submit — so empty inputs become real values.
        </Typography>
        <Box className="rounded-lg border border-border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Option</Table.Head>
                <Table.Head>Description</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {VALUE_OPTIONS.map((row) => (
                <Table.Row key={row.method}>
                  <Table.Cell className="font-mono text-xs">{row.method}</Table.Cell>
                  <Table.Cell className="text-muted-foreground">{row.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <CodeBlock
          code={`const schema = {
  // empty → 'user'; on read and submit
  role: v.string().default('user'),

  // native input gives a string — coerce to a number, then validate
  age: v.number().coerce().int().min(18, 'Must be 18 or older'),

  // null allowed; otherwise must be a valid URL
  website: v.string().url().nullable(),

  // trim + lowercase before storing
  username: v.string().trim().toLowerCase().minLength(3),
};`}
        />
        <Typography as="h4" variant="h4" className="mb-2 mt-6 text-sm font-semibold">
          Configurable email
        </Typography>
        <Typography as="p" variant="body2" className="mb-3 text-muted-foreground">
          <code>email()</code> takes a message or an options object — control the TLD
          requirement, display-name form, custom regex, and domain allow/block lists.
        </Typography>
        <CodeBlock
          code={`v.string().email();                                  // default RFC-lite check
v.string().email('Enter a valid email');             // custom message
v.string().email({ requireTld: false });             // allow ada@localhost
v.string().email({ allowDisplayName: true });        // "Ada <ada@x.com>"
v.string().email({ blocklist: ['mailinator.com'] }); // reject disposable domains
v.string().email({ allowlist: ['company.com'] });    // only this domain
v.string().email({ pattern: /your-regex/ });         // bring your own`}
        />
      </Section>

      <Section id="custom-inputs" title="Custom inputs">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          Use <code>&lt;Controller&gt;</code> (or the <code>useField</code> hook) to bind non-native inputs —
          Select, DatePicker, Combobox, Checkbox — with a fully controlled{' '}
          <code>value</code>/<code>onChange</code>.
        </Typography>
        <CodeBlock
          code={`import { Controller } from '@structyl/forms';
import { Select } from '@structyl/styled';

<Controller name="country" render={({ field }) => (
  <Select value={field.value} onValueChange={field.onChange} />
)} />`}
        />
      </Section>

      <Section id="field-arrays" title="Dynamic lists (useFieldArray)">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          <code>useFieldArray</code> manages repeatable fields with stable keys. It returns{' '}
          <code>fields</code> plus <code>append</code>, <code>prepend</code>, <code>insert</code>,{' '}
          <code>remove</code>, <code>swap</code>, <code>move</code>, <code>update</code>, and{' '}
          <code>replace</code>. Use each <code>field.id</code> as the React <code>key</code>.
        </Typography>
        <PreviewBlock title="Editable list" code={FIELD_ARRAY_CODE}>
          <Box className="flex justify-center">
            <FieldArrayDemo />
          </Box>
        </PreviewBlock>
      </Section>

      <Section id="wizard" title="Multi-step wizards">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          The form store holds <strong>every step’s data</strong> the whole time, so moving between
          steps never loses input. Validate just the current step with <code>form.trigger([...fields])</code>,
          and survive a refresh with <code>useFormPersist</code>.
        </Typography>
        <PreviewBlock title="Stepper" code={WIZARD_CODE}>
          <Box className="flex justify-center">
            <WizardDemo />
          </Box>
        </PreviewBlock>
      </Section>

      <Section id="watching" title="Watching & reading values">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          <code>useWatch(name)</code> subscribes to one field and re-renders only when it changes —
          ideal for conditional fields. <code>form.getValues()</code> reads imperatively without
          subscribing.
        </Typography>
        <CodeBlock
          code={`import { useWatch } from '@structyl/forms';

// Re-renders only when "country" changes
const country = useWatch('country');
return country === 'US' ? <StateSelect /> : null;

// Imperative reads (no re-render)
form.getValues('country');
form.getValues(); // all values`}
        />
      </Section>

      <Section id="external-schemas" title="External schemas (zod / yup)">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          Prefer zod or yup? Bring your own — the adapters convert any external schema into the
          resolver <code>useForm</code> accepts. No dependency is added by structyl.
        </Typography>
        <CodeBlock
          code={`import { useForm, zodResolver } from '@structyl/forms';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });
const form = useForm({ schema: zodResolver(schema) });

// also: yupResolver, standardSchemaResolver (valibot, arktype, …)`}
        />
      </Section>

      <Section id="useform-api" title="useForm API">
        <Box className="rounded-lg border border-border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Member</Table.Head>
                <Table.Head>Description</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {USEFORM_API.map((row) => (
                <Table.Row key={row.name}>
                  <Table.Cell className="font-mono text-xs">{row.name}</Table.Cell>
                  <Table.Cell className="text-muted-foreground">{row.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Section>

      <Section id="ssr" title="SSR & accessibility">
        <Typography as="p" variant="body2" className="text-muted-foreground">
          The validation engine is pure (no <code>window</code>/<code>document</code>), so schemas run on the
          server too. <code>&lt;Form&gt;</code> renders structyl’s accessible <code>Form.Root</code>, wiring
          labels, <code>aria-invalid</code>, and <code>aria-describedby</code> for you. The store is backed by{' '}
          <code>useSyncExternalStore</code> for concurrent-safe, slice-level subscriptions.
        </Typography>
      </Section>
    </Box>
  );
}
