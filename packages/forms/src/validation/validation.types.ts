/**
 * Core validation types for the from-scratch schema engine. No React here.
 */

/** The result of running a single rule or a whole validator. */
export type ValidationResult = { valid: true } | { valid: false; message: string };

/** A single validation rule. May be async. */
export type Rule = (value: unknown, ctx: ValidationContext) => ValidationResult | Promise<ValidationResult>;

/** Context passed to every rule — the full form values, for cross-field checks. */
export interface ValidationContext {
  /** All current form values (for cross-field validation). */
  values: Record<string, unknown>;
}

/** A composable validator — chainable, immutable. */
export interface Validator<T = unknown> {
  /** Phantom type marker for inference. */
  readonly _output?: T;
  /** Run all rules against a value. Resolves to the first failure or `{ valid: true }`. */
  validate(value: unknown, ctx?: ValidationContext): Promise<ValidationResult>;
  /** Run synchronously when no async rules are present. Throws if an async rule is hit. */
  validateSync(value: unknown, ctx?: ValidationContext): ValidationResult;
  /**
   * Apply `.default()` (when empty) and `.coerce()`/`.transform()` to produce the
   * effective value. Used by the form engine to fill defaults on read & submit.
   * Returns the input unchanged when no default/transform is configured.
   */
  coerceValue(value: unknown): unknown;
  /** Whether this validator has a default or transform that changes the value. */
  readonly hasCoercion: boolean;
}

/** A single field's error message, or undefined when valid. */
export type FieldError = string | undefined;

/** Map of field name → error message. */
export type Errors<T = Record<string, unknown>> = Partial<Record<keyof T & string, string>>;

/** A schema: either a map of validators per field, or a function resolver. */
export type Schema<T extends Record<string, unknown> = Record<string, unknown>> =
  | { [K in keyof T]?: Validator }
  | ((values: T) => Errors<T> | Promise<Errors<T>>);

/** When validation runs. */
export type ValidationMode = 'onSubmit' | 'onBlur' | 'onChange' | 'all';
