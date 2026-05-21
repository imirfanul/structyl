export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
  typeof value === 'function';

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !Number.isNaN(value);

export const isArray = <T = unknown>(value: unknown): value is T[] => Array.isArray(value);

export const isNullish = (value: unknown): value is null | undefined => value == null;

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isEmpty = (value: unknown): boolean => {
  if (isNullish(value)) return true;
  if (isString(value) || isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
};

export const isBrowser = (): boolean => typeof window !== 'undefined';
