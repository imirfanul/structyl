import type { Errors } from './validation.types';

/**
 * Adapters that turn an EXTERNAL schema (zod, yup, valibot, …) into the
 * `(values) => Errors` resolver `useForm({ schema })` accepts — without adding a
 * dependency on any of those libraries. You pass the schema you already imported.
 */

type ErrorsOf<T> = Errors<T & Record<string, unknown>>;

/** Minimal shape of a Zod-like schema (`safeParse`). */
interface ZodLike<T> {
  safeParse: (data: unknown) =>
    | { success: true; data: T }
    | { success: false; error: { issues: { path: (string | number)[]; message: string }[] } };
}

/**
 * Adapt a Zod (or Zod-compatible) schema. Maps the first issue per top-level path
 * to a field error.
 *
 * @example
 * import { z } from 'zod';
 * const schema = z.object({ email: z.string().email() });
 * useForm({ schema: zodResolver(schema) });
 */
export function zodResolver<T extends Record<string, unknown>>(
  schema: ZodLike<T>,
): (values: T) => ErrorsOf<T> {
  return (values: T): ErrorsOf<T> => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    const errors: ErrorsOf<T> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? '') as keyof T & string;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return errors;
  };
}

/** Minimal shape of a Yup-like schema (sync `validateSync` with `abortEarly: false`). */
interface YupLike {
  validateSync: (data: unknown, options: { abortEarly: boolean }) => unknown;
}

interface YupError {
  inner: { path?: string; message: string }[];
}

function isYupError(e: unknown): e is YupError {
  return typeof e === 'object' && e !== null && Array.isArray((e as YupError).inner);
}

/**
 * Adapt a Yup schema. Collects the first error per top-level path.
 *
 * @example
 * import * as yup from 'yup';
 * const schema = yup.object({ email: yup.string().email().required() });
 * useForm({ schema: yupResolver(schema) });
 */
export function yupResolver<T extends Record<string, unknown>>(
  schema: YupLike,
): (values: T) => ErrorsOf<T> {
  return (values: T): ErrorsOf<T> => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return {};
    } catch (e) {
      if (!isYupError(e)) throw e;
      const errors: ErrorsOf<T> = {};
      for (const issue of e.inner) {
        const key = (issue.path ?? '').split('.')[0] as keyof T & string;
        if (key && !errors[key]) errors[key] = issue.message;
      }
      return errors;
    }
  };
}

/**
 * Adapt any [Standard Schema](https://standardschema.dev) validator (valibot,
 * arktype, zod 3.24+, …) via the `~standard` interface.
 */
interface StandardSchemaLike {
  '~standard': {
    validate: (value: unknown) =>
      | { value: unknown }
      | { issues: readonly { message: string; path?: readonly (PropertyKey | { key: PropertyKey })[] }[] }
      | Promise<{ value: unknown } | { issues: readonly { message: string; path?: readonly (PropertyKey | { key: PropertyKey })[] }[] }>;
  };
}

export function standardSchemaResolver<T extends Record<string, unknown>>(
  schema: StandardSchemaLike,
): (values: T) => Promise<ErrorsOf<T>> {
  return async (values: T): Promise<ErrorsOf<T>> => {
    const result = await schema['~standard'].validate(values);
    if (!('issues' in result) || !result.issues) return {};
    const errors: ErrorsOf<T> = {};
    for (const issue of result.issues) {
      const seg = issue.path?.[0];
      const key = (typeof seg === 'object' && seg !== null ? seg.key : seg) as keyof T & string;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return errors;
  };
}
