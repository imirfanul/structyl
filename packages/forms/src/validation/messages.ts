/**
 * Default validation message templates. Override per-rule by passing a `message`
 * argument to any builder method.
 *
 * Note: not `as const` — string values must widen to `string` so builder methods
 * like `isTrue(message = defaultMessages.isTrue)` accept any custom message.
 */
export const defaultMessages = {
  required: 'This field is required',
  string: 'Must be text',
  number: 'Must be a number',
  boolean: 'Must be true or false',
  date: 'Must be a valid date',
  array: 'Must be a list',
  email: 'Must be a valid email address',
  url: 'Must be a valid URL',
  pattern: 'Invalid format',
  min: (n: number) => `Must be at least ${n}`,
  max: (n: number) => `Must be at most ${n}`,
  minLength: (n: number) => `Must be at least ${n} character${n === 1 ? '' : 's'}`,
  maxLength: (n: number) => `Must be at most ${n} character${n === 1 ? '' : 's'}`,
  int: 'Must be a whole number',
  positive: 'Must be positive',
  multipleOf: (n: number) => `Must be a multiple of ${n}`,
  oneOf: (values: readonly unknown[]) => `Must be one of: ${values.join(', ')}`,
  isTrue: 'Must be checked',
  nonempty: 'Must not be empty',
  after: 'Date is too early',
  before: 'Date is too late',
};
