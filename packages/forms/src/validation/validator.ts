import type { Rule, ValidationContext, ValidationResult, Validator } from './validation.types';

const ok: ValidationResult = { valid: true };
const fail = (message: string): ValidationResult => ({ valid: false, message });

const EMPTY_CTX: ValidationContext = { values: {} };

/** True for values treated as "absent" by optional()/required()/default(). */
export const isEmpty = (value: unknown): boolean =>
  value === undefined || value === null || value === '';

/** Per-validator behavior carried alongside the rules. */
export interface ValidatorConfig {
  /** Allow empty ('' / undefined) values to short-circuit as valid. */
  optional?: boolean;
  /** Allow `null` specifically (independent of `optional`). */
  nullable?: boolean;
  /** A default value (or factory) used when the input is empty. */
  defaultValue?: unknown | (() => unknown);
  /** Whether a default was set (so `undefined` defaults are honored). */
  hasDefault?: boolean;
  /** A transform applied to the (coerced) value before storing/validating. */
  transform?: (value: unknown) => unknown;
  /** Coerce raw input to this primitive before validation/transform. */
  coerceTo?: 'number' | 'boolean' | 'string' | 'date';
}

function coerceTo(value: unknown, to: NonNullable<ValidatorConfig['coerceTo']>): unknown {
  if (value === undefined || value === null || value === '') return value;
  switch (to) {
    case 'number':
      return Number(value);
    case 'boolean':
      return typeof value === 'string' ? value === 'true' || value === 'on' || value === '1' : Boolean(value);
    case 'string':
      return String(value);
    case 'date':
      return value instanceof Date ? value : new Date(value as string | number);
    default:
      return value;
  }
}

/**
 * Base class for all builders. Holds an immutable list of rules + config; chaining
 * clones. Subclasses add typed helper methods that call `addRule`.
 */
export class BaseValidator<T = unknown> implements Validator<T> {
  protected readonly rules: Rule[];
  protected readonly config: ValidatorConfig;

  constructor(rules: Rule[] = [], config: ValidatorConfig = {}) {
    this.rules = rules;
    this.config = config;
  }

  /** Whether this validator changes its value (default or coerce/transform). */
  get hasCoercion(): boolean {
    return !!(this.config.hasDefault || this.config.transform || this.config.coerceTo);
  }

  /** Clone with an extra rule. */
  protected addRule(rule: Rule): this {
    return this.clone([...this.rules, rule], this.config);
  }

  /** Build a new instance of the concrete subclass. */
  protected clone(rules: Rule[], config: ValidatorConfig): this {
    return new (this.constructor as new (r: Rule[], c: ValidatorConfig) => this)(rules, config);
  }

  /** Allow empty values ('' / undefined) to short-circuit as valid. */
  optional(): this {
    return this.clone(this.rules, { ...this.config, optional: true });
  }

  /** Allow `null` specifically to short-circuit as valid. */
  nullable(): this {
    return this.clone(this.rules, { ...this.config, nullable: true });
  }

  /**
   * Provide a default used when the input is empty. With the form engine, the
   * default fills on read (`form.values`) and on submit.
   */
  default(value: T | (() => T)): this {
    return this.clone(this.rules, { ...this.config, defaultValue: value, hasDefault: true });
  }

  /** Map the value before it is stored/validated. */
  transform(fn: (value: T) => unknown): this {
    return this.clone(this.rules, {
      ...this.config,
      transform: fn as (value: unknown) => unknown,
    });
  }

  /** Add a custom rule. Return `true`/`undefined` for valid, a string for an error message. */
  custom(
    fn: (value: unknown, ctx: ValidationContext) => boolean | string | void | Promise<boolean | string | void>,
  ): this {
    return this.addRule(async (value, ctx) => {
      const result = await fn(value, ctx);
      if (result === true || result === undefined) return ok;
      if (result === false) return fail('Invalid');
      return fail(result);
    });
  }

  /** Apply default + coerce + transform to produce the effective value. */
  coerceValue(value: unknown): unknown {
    let next = value;
    if (isEmpty(next) && this.config.hasDefault) {
      const d = this.config.defaultValue;
      next = typeof d === 'function' ? (d as () => unknown)() : d;
    }
    if (this.config.coerceTo) next = coerceTo(next, this.config.coerceTo);
    if (this.config.transform && !isEmpty(next)) next = this.config.transform(next);
    return next;
  }

  /** True when the value should skip rule-checking (optional empty / nullable null). */
  protected shouldSkip(value: unknown): boolean {
    if (this.config.nullable && value === null) return true;
    if (this.config.optional && isEmpty(value)) return true;
    return false;
  }

  validateSync(value: unknown, ctx: ValidationContext = EMPTY_CTX): ValidationResult {
    const v = this.coerceValue(value);
    if (this.shouldSkip(v)) return ok;
    for (const rule of this.rules) {
      const result = rule(v, ctx);
      if (result instanceof Promise) {
        throw new Error('validateSync called on a validator with async rules; use validate() instead');
      }
      if (!result.valid) return result;
    }
    return ok;
  }

  async validate(value: unknown, ctx: ValidationContext = EMPTY_CTX): Promise<ValidationResult> {
    const v = this.coerceValue(value);
    if (this.shouldSkip(v)) return ok;
    for (const rule of this.rules) {
      const result = await rule(v, ctx);
      if (!result.valid) return result;
    }
    return ok;
  }
}

export { ok, fail };
