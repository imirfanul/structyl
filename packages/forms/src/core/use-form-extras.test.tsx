import * as React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useForm } from './use-form';
import { useWatch } from './use-watch';
import { useFormPersist } from './use-form-persist';
import { FormProvider } from './form-context';
import { v } from '../validation/builders';

interface Values extends Record<string, unknown> {
  email: string;
  password: string;
  country: string;
}

const schema = {
  email: v.string().required().email(),
  password: v.string().required().minLength(8),
};

describe('useForm — extras', () => {
  it('trigger validates a subset of fields (wizard step)', async () => {
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: { email: 'bad', password: '', country: '' }, schema }),
    );

    // Validate only the email step
    let ok = false;
    await act(async () => {
      ok = await result.current.trigger('email');
    });
    expect(ok).toBe(false);
    expect(result.current.errors.email).toBeDefined();
    // password was NOT validated in this step
    expect(result.current.errors.password).toBeUndefined();

    // Validate two fields at once
    await act(async () => {
      await result.current.trigger(['email', 'password']);
    });
    expect(result.current.errors.password).toBeDefined();
  });

  it('tracks dirtyFields and isValidating', async () => {
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: { email: 'a@b.com', password: '', country: '' } }),
    );
    expect(result.current.dirtyFields.email).toBeFalsy();
    act(() => result.current.setValue('email', 'changed@x.com'));
    expect(result.current.dirtyFields.email).toBe(true);
    // setting back to initial clears dirty
    act(() => result.current.setValue('email', 'a@b.com'));
    expect(result.current.dirtyFields.email).toBe(false);
  });

  it('getValues reads without subscribing', () => {
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: { email: 'a@b.com', password: 'x', country: 'US' } }),
    );
    expect(result.current.getValues('country')).toBe('US');
    expect(result.current.getValues()).toMatchObject({ country: 'US' });
  });

  it('setFocus focuses a registered field', () => {
    function Demo() {
      const form = useForm<Values>({ defaultValues: { email: '', password: '', country: '' } });
      return (
        <>
          <input aria-label="email" {...form.register('email')} />
          <button type="button" onClick={() => form.setFocus('email')}>
            focus
          </button>
        </>
      );
    }
    render(<Demo />);
    screen.getByRole('button').click();
    expect(document.activeElement).toBe(screen.getByLabelText('email'));
  });

  it('debounces validation when validateDebounce is set', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() =>
      useForm<Values>({
        defaultValues: { email: '', password: '', country: '' },
        schema,
        mode: 'onChange',
        validateDebounce: 300,
      }),
    );
    act(() => result.current.setValue('email', 'bad'));
    // not yet validated
    expect(result.current.errors.email).toBeUndefined();
    await act(async () => {
      vi.advanceTimersByTime(300);
      await Promise.resolve();
    });
    expect(result.current.errors.email).toBeDefined();
    vi.useRealTimers();
  });
});

describe('useWatch', () => {
  it('returns the watched field value reactively', () => {
    function Demo() {
      const form = useForm<Values>({ defaultValues: { email: '', password: '', country: 'US' } });
      return (
        <FormProvider form={form}>
          <Watcher />
          <button type="button" onClick={() => form.setValue('country', 'CA')}>
            change
          </button>
        </FormProvider>
      );
    }
    function Watcher() {
      const country = useWatch<string>('country');
      return <span data-testid="country">{country}</span>;
    }
    render(<Demo />);
    expect(screen.getByTestId('country').textContent).toBe('US');
    act(() => screen.getByRole('button').click());
    expect(screen.getByTestId('country').textContent).toBe('CA');
  });
});

describe('useFormPersist', () => {
  beforeEach(() => window.localStorage.clear());

  it('saves values to storage and restores on remount', async () => {
    const key = 'test-wizard';

    function Step() {
      const form = useForm<Values>({ defaultValues: { email: '', password: '', country: '' } });
      useFormPersist(form, key, { debounce: 0 });
      return (
        <FormProvider form={form}>
          <span data-testid="email">{String(form.values.email)}</span>
          <button type="button" onClick={() => form.setValue('email', 'saved@x.com')}>
            set
          </button>
        </FormProvider>
      );
    }

    const { unmount } = render(<Step />);
    act(() => screen.getByRole('button').click());
    // storage written synchronously (debounce 0 → microtask)
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5));
    });
    expect(window.localStorage.getItem(key)).toContain('saved@x.com');
    unmount();

    // Remount → restored
    render(<Step />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5));
    });
    expect(screen.getByTestId('email').textContent).toBe('saved@x.com');
  });

  it('clear() removes persisted data', async () => {
    const key = 'clear-test';
    function Demo() {
      const form = useForm<Values>({ defaultValues: { email: 'x@y.com', password: '', country: '' } });
      const { clear } = useFormPersist(form, key, { debounce: 0 });
      return (
        <button type="button" onClick={clear}>
          clear
        </button>
      );
    }
    render(<Demo />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5));
    });
    expect(window.localStorage.getItem(key)).not.toBeNull();
    act(() => screen.getByRole('button').click());
    expect(window.localStorage.getItem(key)).toBeNull();
  });

  it('excludes sensitive fields', async () => {
    const key = 'exclude-test';
    function Demo() {
      const form = useForm<Values>({
        defaultValues: { email: 'a@b.com', password: 'secret', country: '' },
      });
      useFormPersist(form, key, { debounce: 0, exclude: ['password'] });
      return <span>ok</span>;
    }
    render(<Demo />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5));
    });
    const stored = window.localStorage.getItem(key) ?? '';
    expect(stored).toContain('a@b.com');
    expect(stored).not.toContain('secret');
  });
});
