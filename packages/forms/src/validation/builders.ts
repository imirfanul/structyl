import { StringValidator } from './string';
import { NumberValidator } from './number';
import { BooleanValidator } from './boolean';
import { DateValidator } from './date';
import { ArrayValidator } from './array';
import { ObjectValidator } from './object';
import { BaseValidator } from './validator';
import type { Validator } from './validation.types';

/**
 * The `v` namespace — a chainable, from-scratch validator builder.
 *
 * @example
 * const schema = {
 *   email: v.string().required().email(),
 *   age: v.number().int().min(18),
 *   terms: v.boolean().isTrue('You must accept the terms'),
 * };
 */
export const v = {
  /** A string validator: `.required().min(3).email()` etc. */
  string: () => new StringValidator(),
  /** A number validator: `.int().min(0).max(100)` etc. */
  number: () => new NumberValidator(),
  /** A boolean validator: `.isTrue()` etc. */
  boolean: () => new BooleanValidator(),
  /** A date validator: `.valid().after(new Date())` etc. */
  date: () => new DateValidator(),
  /** An array validator. Pass an item validator to enable `.eachItem()`. */
  array: (item?: Validator) => new ArrayValidator([], {}, item),
  /** An object validator over a nested shape. Call `.shapeValid()` to validate keys. */
  object: (shape: Record<string, Validator>) => new ObjectValidator([], {}, shape),
  /** A bare custom validator with no base type. */
  custom: (
    fn: Parameters<BaseValidator['custom']>[0],
  ): Validator => new BaseValidator().custom(fn),
} as const;
