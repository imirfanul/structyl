import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { Form } from './components/form';
import { Field } from './components/form-field';
import { useForm } from './core/use-form';
import { v } from './validation/builders';

interface Values extends Record<string, unknown> {
  email: string;
}

function ServerForm() {
  const form = useForm<Values>({
    defaultValues: { email: '' },
    schema: { email: v.string().required().email() },
  });
  return (
    <Form form={form}>
      <Field name="email" label="Email" />
    </Form>
  );
}

describe('SSR', () => {
  it('renders <Form> to a string without throwing (no window access)', () => {
    const html = renderToString(<ServerForm />);
    expect(html).toContain('<form');
    expect(html).toContain('Email');
  });

  it('the validation engine is pure and usable on the server', async () => {
    const validator = v.string().required().email();
    const result = await validator.validate('a@b.com');
    expect(result.valid).toBe(true);
  });
});
