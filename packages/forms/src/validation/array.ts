import { BaseValidator, fail, ok, type ValidatorConfig } from './validator';
import { defaultMessages } from './messages';
import type { Rule, Validator } from './validation.types';

const toArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

export class ArrayValidator extends BaseValidator<unknown[]> {
  private readonly itemValidator?: Validator;

  constructor(rules: Rule[] = [], config: ValidatorConfig = {}, itemValidator?: Validator) {
    super(rules, config);
    this.itemValidator = itemValidator;
  }

  protected override clone(rules: Rule[], config: ValidatorConfig): this {
    return new ArrayValidator(rules, config, this.itemValidator) as this;
  }

  required(message = defaultMessages.required): ArrayValidator {
    return this.addRule((value) => (Array.isArray(value) ? ok : fail(message)));
  }

  nonempty(message = defaultMessages.nonempty): ArrayValidator {
    return this.addRule((value) => (toArray(value).length > 0 ? ok : fail(message)));
  }

  min(n: number, message = defaultMessages.min(n)): ArrayValidator {
    return this.addRule((value) => (toArray(value).length >= n ? ok : fail(message)));
  }

  max(n: number, message = defaultMessages.max(n)): ArrayValidator {
    return this.addRule((value) => (toArray(value).length <= n ? ok : fail(message)));
  }

  /** Validate every item against the validator passed to `v.array(item)`. */
  eachItem(): ArrayValidator {
    return this.addRule(async (value, ctx) => {
      if (!this.itemValidator) return ok;
      const items = toArray(value);
      for (let i = 0; i < items.length; i++) {
        const result = await this.itemValidator.validate(items[i], ctx);
        if (!result.valid) return fail(`Item ${i + 1}: ${result.message}`);
      }
      return ok;
    });
  }
}
