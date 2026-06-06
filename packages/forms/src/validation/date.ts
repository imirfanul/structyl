import { BaseValidator, fail, ok, type ValidatorConfig } from './validator';
import { defaultMessages } from './messages';

const toDate = (value: unknown): Date =>
  value instanceof Date ? value : new Date(value as string | number);

const isValidDate = (d: Date): boolean => !Number.isNaN(d.getTime());

export class DateValidator extends BaseValidator<Date> {
  required(message: string = defaultMessages.required): DateValidator {
    return this.addRule((value) =>
      value === undefined || value === null || value === '' ? fail(message) : ok,
    );
  }

  /** Coerce string/number input to a Date before validating. */
  coerce(): DateValidator {
    return this.clone(this.rules, { ...this.config, coerceTo: 'date' } as ValidatorConfig) as DateValidator;
  }

  /** Ensure the value parses to a valid date. */
  valid(message: string = defaultMessages.date): DateValidator {
    return this.addRule((value) => (isValidDate(toDate(value)) ? ok : fail(message)));
  }

  /** On or after `date`. */
  min(date: Date | string | number, message = defaultMessages.after): DateValidator {
    const bound = toDate(date).getTime();
    return this.addRule((value) => (toDate(value).getTime() >= bound ? ok : fail(message)));
  }

  /** On or before `date`. */
  max(date: Date | string | number, message = defaultMessages.before): DateValidator {
    const bound = toDate(date).getTime();
    return this.addRule((value) => (toDate(value).getTime() <= bound ? ok : fail(message)));
  }

  /** Strictly after `date`. */
  after(date: Date | string | number, message = defaultMessages.after): DateValidator {
    const bound = toDate(date).getTime();
    return this.addRule((value) => (toDate(value).getTime() > bound ? ok : fail(message)));
  }

  /** Strictly before `date`. */
  before(date: Date | string | number, message = defaultMessages.before): DateValidator {
    const bound = toDate(date).getTime();
    return this.addRule((value) => (toDate(value).getTime() < bound ? ok : fail(message)));
  }
}
