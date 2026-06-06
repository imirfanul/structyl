import type { Errors, Schema, Validator } from './validation.types';

/** A normalized resolver: given all values, returns a map of field → error message. */
export type ResolvedSchema<T extends Record<string, unknown>> = (
  values: T,
) => Promise<Errors<T>>;

const isValidator = (x: unknown): x is Validator =>
  typeof x === 'object' && x !== null && typeof (x as Validator).validate === 'function';

/**
 * Build a value-coercer from a validator-map schema. Applies each field's
 * `.default()` / `.coerce()` / `.transform()` to produce the effective values.
 * Returns `null` when no field needs coercion (so the form can skip the work).
 */
export function createCoercer<T extends Record<string, unknown>>(
  schema: Schema<T> | undefined,
): ((values: T) => T) | null {
  if (!schema || typeof schema === 'function') return null;
  const coercing = Object.entries(schema).filter(
    ([, val]) => isValidator(val) && (val as Validator).hasCoercion,
  ) as [keyof T & string, Validator][];
  if (coercing.length === 0) return null;

  return (values: T): T => {
    const next = { ...values };
    for (const [key, validator] of coercing) {
      next[key] = validator.coerceValue(values[key]) as T[keyof T & string];
    }
    return next;
  };
}

/**
 * Normalize a `Schema` (validator map OR resolver function) into a single async
 * resolver that returns an errors map. Validators run with the full values as context.
 */
export function resolveSchema<T extends Record<string, unknown>>(
  schema: Schema<T> | undefined,
): ResolvedSchema<T> {
  if (!schema) {
    return async () => ({});
  }

  if (typeof schema === 'function') {
    return async (values: T) => (await schema(values)) ?? {};
  }

  const entries = Object.entries(schema).filter(([, val]) => isValidator(val)) as [
    keyof T & string,
    Validator,
  ][];

  return async (values: T) => {
    const errors: Errors<T> = {};
    await Promise.all(
      entries.map(async ([key, validator]) => {
        const result = await validator.validate(values[key], { values });
        if (!result.valid) {
          errors[key] = result.message;
        }
      }),
    );
    return errors;
  };
}
