import * as React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useForm } from './use-form';
import { useFieldArray } from './use-field-array';
import { FormProvider } from './form-context';

interface Values extends Record<string, unknown> {
  contacts: { email: string }[];
}

function wrapper(form: ReturnType<typeof useForm<Values>>) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <FormProvider form={form}>{children}</FormProvider>;
  };
}

describe('useFieldArray', () => {
  it('appends, prepends, and removes with stable keys', () => {
    const { result: formResult } = renderHook(() =>
      useForm<Values>({ defaultValues: { contacts: [{ email: 'a@x.com' }] } }),
    );
    const form = formResult.current;
    const { result } = renderHook(() => useFieldArray<{ email: string }>('contacts'), {
      wrapper: wrapper(form),
    });

    expect(result.current.fields).toHaveLength(1);
    const firstId = result.current.fields[0]!.id;

    act(() => result.current.append({ email: 'b@x.com' }));
    expect(result.current.fields).toHaveLength(2);
    // first item keeps its key after append
    expect(result.current.fields[0]!.id).toBe(firstId);

    act(() => result.current.prepend({ email: 'z@x.com' }));
    expect(result.current.fields[0]!.value.email).toBe('z@x.com');
    expect(result.current.fields).toHaveLength(3);

    act(() => result.current.remove(0));
    expect(result.current.fields).toHaveLength(2);
    expect(result.current.fields[0]!.value.email).toBe('a@x.com');
  });

  it('inserts, swaps, moves, updates, and replaces', () => {
    const { result: formResult } = renderHook(() =>
      useForm<Values>({ defaultValues: { contacts: [{ email: '0' }, { email: '1' }, { email: '2' }] } }),
    );
    const { result } = renderHook(() => useFieldArray<{ email: string }>('contacts'), {
      wrapper: wrapper(formResult.current),
    });

    act(() => result.current.insert(1, { email: 'X' }));
    expect(result.current.fields.map((f) => f.value.email)).toEqual(['0', 'X', '1', '2']);

    act(() => result.current.swap(0, 3));
    expect(result.current.fields.map((f) => f.value.email)).toEqual(['2', 'X', '1', '0']);

    act(() => result.current.move(0, 2));
    expect(result.current.fields.map((f) => f.value.email)).toEqual(['X', '1', '2', '0']);

    act(() => result.current.update(0, { email: 'updated' }));
    expect(result.current.fields[0]!.value.email).toBe('updated');

    act(() => result.current.replace([{ email: 'only' }]));
    expect(result.current.fields.map((f) => f.value.email)).toEqual(['only']);
  });

  it('renders dynamic inputs end-to-end', async () => {
    const user = userEvent.setup();

    function Fields() {
      const form = useForm<Values>({ defaultValues: { contacts: [{ email: '' }] } });
      return (
        <FormProvider form={form}>
          <Inner />
        </FormProvider>
      );

      function Inner() {
        const array = useFieldArray<{ email: string }>('contacts');
        return (
          <>
            {array.fields.map((field, i) => (
              <input key={field.id} aria-label={`email-${i}`} {...form.register(`contacts[${i}].email` as never)} />
            ))}
            <button type="button" onClick={() => array.append({ email: '' })}>
              Add ({array.fields.length})
            </button>
          </>
        );
      }
    }

    render(<Fields />);
    expect(screen.getByText('Add (1)')).toBeDefined();
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Add (2)')).toBeDefined();
    expect(screen.getByLabelText('email-1')).toBeDefined();
  });
});
