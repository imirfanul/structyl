import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Form } from './form';
import { Field } from './form-field';
import { ErrorMessage } from './form-error-message';
import { useForm } from '../core/use-form';
import { v } from '../validation/builders';

interface Values extends Record<string, unknown> {
  email: string;
}

const schema = { email: v.string().required().email() };

function Harness({ onSubmit }: { onSubmit?: (v: Values) => void }) {
  const form = useForm<Values>({ defaultValues: { email: '' }, schema, mode: 'onBlur', onSubmit });
  return (
    <Form form={form}>
      <Field name="email" label="Email" description="We never share it." placeholder="you@example.com" />
      <button type="submit">Submit</button>
    </Form>
  );
}

describe('Form components', () => {
  it('renders a labelled field with description', () => {
    render(<Harness />);
    expect(screen.getByText('Email')).toBeDefined();
    expect(screen.getByText('We never share it.')).toBeDefined();
    expect(screen.getByPlaceholderText('you@example.com')).toBeDefined();
  });

  it('shows a validation error after blur and submit', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByPlaceholderText('you@example.com');
    await user.type(input, 'bad');
    await user.tab(); // blur → onBlur validation
    await waitFor(() => expect(screen.getByText('Must be a valid email address')).toBeDefined());
  });

  it('submits valid values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    await user.type(screen.getByPlaceholderText('you@example.com'), 'a@b.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com' }));
  });

  it('ErrorMessage renders the field error when touched', async () => {
    const user = userEvent.setup();
    function WithStandalone() {
      const form = useForm<Values>({ defaultValues: { email: '' }, schema, mode: 'onChange' });
      return (
        <Form form={form}>
          <input aria-label="email" {...form.register('email')} onBlur={() => form.setTouched('email', true)} />
          <ErrorMessage name="email" />
        </Form>
      );
    }
    render(<WithStandalone />);
    await user.type(screen.getByLabelText('email'), 'nope');
    await user.tab();
    await waitFor(() => expect(screen.getByRole('alert')).toBeDefined());
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Harness />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
