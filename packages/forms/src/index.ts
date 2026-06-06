/**
 * @structyl/forms
 *
 * Headless, schema-driven forms for React. A from-scratch chainable validator,
 * a `useForm` reactive engine, and `Form`/`Field` components over structyl's
 * accessible form primitives. Zero runtime deps beyond structyl.
 */

// ── Validation engine (React-free) ──────────────────────────────────────────────
export { v } from './validation/builders';
export { resolveSchema, createCoercer } from './validation/resolve';
export { defaultMessages } from './validation/messages';
export { zodResolver, yupResolver, standardSchemaResolver } from './validation/adapters';
export type { ResolvedSchema } from './validation/resolve';
export type { EmailOptions } from './validation/string';
export type {
  Validator,
  Schema,
  FieldError,
  Errors,
  ValidationMode,
  ValidationResult,
  ValidationContext,
  Rule,
} from './validation/validation.types';

// ── Reactive engine ──────────────────────────────────────────────────────────────
export { useForm } from './core/use-form';
export { useField } from './core/use-field';
export { useFieldArray } from './core/use-field-array';
export { useWatch } from './core/use-watch';
export { useFormPersist } from './core/use-form-persist';
export { useFormContext, FormProvider } from './core/form-context';
export { getPath, setPath, deletePath, parsePath } from './core/get-set-path';
export type { FormStore, FormState } from './core/form-store';
export type { FormContextValue } from './core/form-context';
export type { UseFieldReturn } from './core/use-field';
export type { UseFieldArrayReturn, FieldArrayItem } from './core/use-field-array';
export type { UseFormPersistOptions } from './core/use-form-persist';
export type {
  UseFormOptions,
  FormApi,
  FormValues,
  FieldNames,
  FieldState,
  RegisterReturn,
  RegisterOptions,
  SetValueOptions,
  SubmitHandler,
  SubmitErrorHandler,
} from './core/form.types';

// ── Component layer ──────────────────────────────────────────────────────────────
export { Form } from './components/form';
export { Field } from './components/form-field';
export { Controller } from './components/field-controller';
export { ErrorMessage } from './components/form-error-message';
export type {
  FormProps,
  FieldProps,
  ControllerProps,
  ErrorMessageProps,
} from './components/components.types';
