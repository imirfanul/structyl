import * as React from 'react';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from './use-form';
import { v } from '../validation/builders';

interface LoginValues extends Record<string, unknown> {
  email: string;
  password: string;
}

const schema = {
  email: v.string().required().email(),
  password: v.string().required().minLength(6),
};

describe('useForm', () => {
  it('initializes from defaultValues', () => {
    const { result } = renderHook(() =>
      useForm<LoginValues>({ defaultValues: { email: 'a@b.com', password: '' } }),
    );
    expect(result.current.values.email).toBe('a@b.com');
    expect(result.current.isDirty).toBe(false);
    expect(result.current.submitCount).toBe(0);
  });

  it('setValue updates values and dirty flag', () => {
    const { result } = renderHook(() => useForm<LoginValues>({ defaultValues: { email: '', password: '' } }));
    act(() => result.current.setValue('email', 'x@y.com'));
    expect(result.current.values.email).toBe('x@y.com');
    expect(result.current.isDirty).toBe(true);
  });

  it('validates on submit and blocks onSubmit when invalid', async () => {
    const onSubmit = vi.fn();
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useForm<LoginValues>({ defaultValues: { email: 'bad', password: '123' }, schema, onSubmit, onError }),
    );

    await act(async () => {
      await result.current.handleSubmit()();
    });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(result.current.errors.email).toBeDefined();
    expect(result.current.errors.password).toBeDefined();
    expect(result.current.submitCount).toBe(1);
    // errored fields become touched
    expect(result.current.touched.email).toBe(true);
  });

  it('calls onSubmit with valid values', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm<LoginValues>({
        defaultValues: { email: 'a@b.com', password: 'secret1' },
        schema,
        onSubmit,
      }),
    );

    await act(async () => {
      await result.current.handleSubmit()();
    });

    expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com', password: 'secret1' });
    expect(result.current.isValid).toBe(true);
  });

  it('setError / clearErrors work imperatively', () => {
    const { result } = renderHook(() => useForm<LoginValues>({ defaultValues: { email: '', password: '' } }));
    act(() => result.current.setError('email', 'Taken'));
    expect(result.current.errors.email).toBe('Taken');
    act(() => result.current.clearErrors('email'));
    expect(result.current.errors.email).toBeUndefined();
  });

  it('reset returns to initial values', () => {
    const { result } = renderHook(() =>
      useForm<LoginValues>({ defaultValues: { email: 'a@b.com', password: '' } }),
    );
    act(() => result.current.setValue('email', 'changed@x.com'));
    expect(result.current.isDirty).toBe(true);
    act(() => result.current.reset());
    expect(result.current.values.email).toBe('a@b.com');
    expect(result.current.isDirty).toBe(false);
  });

  it('register binds a native input and validates onChange in onChange mode', async () => {
    const user = userEvent.setup();
    function TestForm() {
      const form = useForm<LoginValues>({ defaultValues: { email: '', password: '' }, schema, mode: 'onChange' });
      return (
        <form>
          <input aria-label="email" {...form.register('email')} />
          <span data-testid="err">{form.errors.email ?? ''}</span>
          <span data-testid="val">{String(form.values.email)}</span>
        </form>
      );
    }
    render(<TestForm />);
    await user.type(screen.getByLabelText('email'), 'a@b.com');
    expect(screen.getByTestId('val').textContent).toBe('a@b.com');
    await waitFor(() => expect(screen.getByTestId('err').textContent).toBe(''));
  });

  it('mirrors controlled values prop', () => {
    const { result, rerender } = renderHook(
      ({ values }) => useForm<LoginValues>({ values }),
      { initialProps: { values: { email: 'one@x.com', password: '' } as LoginValues } },
    );
    expect(result.current.values.email).toBe('one@x.com');
    rerender({ values: { email: 'two@x.com', password: '' } as LoginValues });
    expect(result.current.values.email).toBe('two@x.com');
  });

  it('getFieldState reports per-field derived state', () => {
    const { result } = renderHook(() =>
      useForm<LoginValues>({ defaultValues: { email: 'a@b.com', password: '' } }),
    );
    act(() => result.current.setValue('email', 'z@z.com', { shouldTouch: true }));
    const state = result.current.getFieldState('email');
    expect(state.value).toBe('z@z.com');
    expect(state.dirty).toBe(true);
    expect(state.touched).toBe(true);
  });
});
