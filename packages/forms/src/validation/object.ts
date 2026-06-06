import { BaseValidator, fail, ok, type ValidatorConfig } from './validator';
import { defaultMessages } from './messages';
import type { Rule, Validator } from './validation.types';

type Shape = Record<string, Validator>;

export class ObjectValidator extends BaseValidator<Record<string, unknown>> {
  private readonly shape: Shape;

  constructor(rules: Rule[] = [], config: ValidatorConfig = {}, shape: Shape = {}) {
    super(rules, config);
    this.shape = shape;
  }

  protected override clone(rules: Rule[], config: ValidatorConfig): this {
    return new ObjectValidator(rules, config, this.shape) as this;
  }

  required(message = defaultMessages.required): ObjectValidator {
    return this.addRule((value) =>
      value !== null && typeof value === 'object' ? ok : fail(message),
    );
  }

  /** Validate each key against its validator in the shape. Reports the first failing key. */
  shapeValid(): ObjectValidator {
    return this.addRule(async (value, ctx) => {
      const obj = (value ?? {}) as Record<string, unknown>;
      for (const key of Object.keys(this.shape)) {
        const validator = this.shape[key];
        if (!validator) continue;
        const result = await validator.validate(obj[key], { values: obj });
        if (!result.valid) return fail(`${key}: ${result.message}`);
      }
      void ctx;
      return ok;
    });
  }
}
