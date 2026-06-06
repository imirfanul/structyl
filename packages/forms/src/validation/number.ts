import { BaseValidator, fail, ok, type ValidatorConfig } from './validator';
import { defaultMessages } from './messages';

const toNum = (value: unknown): number => (typeof value === 'number' ? value : Number(value));

export class NumberValidator extends BaseValidator<number> {
  required(message: string = defaultMessages.required): NumberValidator {
    return this.addRule((value) =>
      value === undefined || value === null || value === '' ? fail(message) : ok,
    );
  }

  /** Coerce string/other input to a number before validating (e.g. native input values). */
  coerce(): NumberValidator {
    return this.clone(this.rules, { ...this.config, coerceTo: 'number' } as ValidatorConfig) as NumberValidator;
  }

  /** Ensure the value is a finite number. */
  finite(message: string = defaultMessages.number): NumberValidator {
    return this.addRule((value) => (Number.isFinite(toNum(value)) ? ok : fail(message)));
  }

  min(n: number, message: string = defaultMessages.min(n)): NumberValidator {
    return this.addRule((value) => (toNum(value) >= n ? ok : fail(message)));
  }

  max(n: number, message: string = defaultMessages.max(n)): NumberValidator {
    return this.addRule((value) => (toNum(value) <= n ? ok : fail(message)));
  }

  /** Inclusive range: `min <= value <= max`. */
  between(min: number, max: number, message: string = `Must be between ${min} and ${max}`): NumberValidator {
    return this.addRule((value) => {
      const n = toNum(value);
      return n >= min && n <= max ? ok : fail(message);
    });
  }

  int(message: string = defaultMessages.int): NumberValidator {
    return this.addRule((value) => (Number.isInteger(toNum(value)) ? ok : fail(message)));
  }

  /** A safe integer (within Number.MAX_SAFE_INTEGER). */
  safe(message: string = 'Must be a safe integer'): NumberValidator {
    return this.addRule((value) => (Number.isSafeInteger(toNum(value)) ? ok : fail(message)));
  }

  positive(message: string = defaultMessages.positive): NumberValidator {
    return this.addRule((value) => (toNum(value) > 0 ? ok : fail(message)));
  }

  negative(message: string = 'Must be negative'): NumberValidator {
    return this.addRule((value) => (toNum(value) < 0 ? ok : fail(message)));
  }

  /** Greater than or equal to zero. */
  nonnegative(message: string = 'Must be zero or greater'): NumberValidator {
    return this.addRule((value) => (toNum(value) >= 0 ? ok : fail(message)));
  }

  /** Less than or equal to zero. */
  nonpositive(message: string = 'Must be zero or less'): NumberValidator {
    return this.addRule((value) => (toNum(value) <= 0 ? ok : fail(message)));
  }

  /** Value must be a multiple of `n` (alias-friendly with `multipleOf`). */
  step(n: number, message: string = defaultMessages.multipleOf(n)): NumberValidator {
    return this.multipleOf(n, message);
  }

  multipleOf(n: number, message: string = defaultMessages.multipleOf(n)): NumberValidator {
    return this.addRule((value) => (toNum(value) % n === 0 ? ok : fail(message)));
  }
}
