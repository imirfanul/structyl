import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from './use-form';
import { v } from '../validation/builders';

interface Values extends Record<string, unknown> {
  role: string;
  age: number | undefined;
  name: string;
}

const schema = {
  role: v.string().default('user'),
  age: v.number().coerce().int(),
  name: v.string().trim(),
};

describe('useForm — defaults / coercion (fill on read + submit)', () => {
  it('fills defaults in form.values (read)', () => {
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: { role: '', age: undefined, name: '  Ada  ' }, schema }),
    );
    // role empty → default 'user'; name trimmed
    expect(result.current.values.role).toBe('user');
    expect(result.current.values.name).toBe('Ada');
  });

  it('coerces string number input on read', () => {
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: { role: 'admin', age: undefined, name: 'x' }, schema }),
    );
    act(() => result.current.setValue('age', '42'));
    expect(result.current.values.age).toBe(42);
  });

  it('passes coerced/defaulted values to onSubmit', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm<Values>({
        defaultValues: { role: '', age: undefined, name: '  Grace  ' },
        schema,
        onSubmit,
      }),
    );
    act(() => result.current.setValue('age', '30'));
    await act(async () => {
      await result.current.handleSubmit()();
    });
    expect(onSubmit).toHaveBeenCalledWith({ role: 'user', age: 30, name: 'Grace' });
  });

  it('getValues returns coerced values', () => {
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: { role: '', age: undefined, name: 'x' }, schema }),
    );
    expect(result.current.getValues('role')).toBe('user');
  });
});
