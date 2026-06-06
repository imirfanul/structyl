'use client';

import { useField } from '../core/use-field';
import type { FormValues } from '../core/form.types';
import type { ControllerProps } from './components.types';

/**
 * A controlled adapter for custom inputs (Select, DatePicker, Combobox…).
 * Gives a fully controlled `value`/`onChange` binding via render-prop.
 *
 * @example
 * <Controller name="country" render={({ field }) => (
 *   <Select value={field.value} onValueChange={field.onChange} />
 * )} />
 */
export function Controller<T extends FormValues>({ name, render }: ControllerProps<T>) {
  const fieldState = useField<T>(name);
  return render({ field: fieldState.field, fieldState });
}
Controller.displayName = 'Controller';
