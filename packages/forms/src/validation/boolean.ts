import { BaseValidator, fail, ok, type ValidatorConfig } from './validator';
import { defaultMessages } from './messages';

export class BooleanValidator extends BaseValidator<boolean> {
  required(message: string = defaultMessages.required): BooleanValidator {
    return this.addRule((value) =>
      value === undefined || value === null ? fail(message) : ok,
    );
  }

  /** Coerce input ("true"/"on"/"1"/checked) to a boolean before validating. */
  coerce(): BooleanValidator {
    return this.clone(this.rules, { ...this.config, coerceTo: 'boolean' } as ValidatorConfig) as BooleanValidator;
  }

  /** Require the value to be exactly `true` (e.g. "accept terms"). */
  isTrue(message: string = defaultMessages.isTrue): BooleanValidator {
    return this.addRule((value) => (value === true ? ok : fail(message)));
  }

  /** Require the value to be exactly `false`. */
  isFalse(message: string = 'Must be unchecked'): BooleanValidator {
    return this.addRule((value) => (value === false ? ok : fail(message)));
  }
}
