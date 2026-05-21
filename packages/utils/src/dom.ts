import { isBrowser } from './type-guards';

export const getOwnerDocument = (node: Node | null | undefined): Document =>
  node?.ownerDocument ?? (isBrowser() ? document : ({} as Document));

export const getOwnerWindow = (node: Node | null | undefined): Window =>
  (getOwnerDocument(node).defaultView ?? (isBrowser() ? window : ({} as Window))) as Window;

export const getActiveElement = (doc: Document = document): Element | null => doc.activeElement;

/** A list of all focusable element selectors. */
export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

export const getFocusableElements = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
  );
};

export const contains = (parent: Node | null, child: Node | null): boolean => {
  if (!parent || !child) return false;
  return parent.contains(child);
};
