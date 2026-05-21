export const capitalize = (str: string): string =>
  str.length === 0 ? str : str.charAt(0).toUpperCase() + str.slice(1);

export const camelCase = (str: string): string =>
  str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (m) => m.toLowerCase());

export const kebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const snakeCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();

export const truncate = (str: string, maxLength: number, suffix = '…'): string =>
  str.length <= maxLength ? str : str.slice(0, maxLength - suffix.length) + suffix;

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
