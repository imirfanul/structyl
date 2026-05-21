'use client';

import * as React from 'react';
import { useComposedRefs, useCallbackRef } from './_internal';
import { Primitive } from './primitive';

const AUTOFOCUS_ON_MOUNT = 'focusScope.autoFocusOnMount';
const AUTOFOCUS_ON_UNMOUNT = 'focusScope.autoFocusOnUnmount';
const EVENT_OPTIONS = { bubbles: false, cancelable: true } as const;

type FocusableTarget = HTMLElement | { focus: () => void };

interface FocusScopeProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  /** When true, tabbing from the last focusable wraps to the first. */
  loop?: boolean;
  /** When true, focus cannot leave the scope while it is mounted. */
  trapped?: boolean;
  /** Called when focus moves into the scope. Call `event.preventDefault()` to prevent default. */
  onMountAutoFocus?: (event: Event) => void;
  /** Called when focus is about to leave the scope on unmount. Call `event.preventDefault()` to prevent default restoration. */
  onUnmountAutoFocus?: (event: Event) => void;
}

const FocusScope = React.forwardRef<HTMLDivElement, FocusScopeProps>(
  (props, forwardedRef) => {
    const {
      loop = false,
      trapped = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...scopeProps
    } = props;

    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
    const lastFocusedElementRef = React.useRef<HTMLElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, setContainer);

    // Scope-stack registration (must be declared before effects that depend on it)
    const scope = React.useRef<FocusScopeAPI>({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;

    // Track focus within the scope so we can restore inside on focusout
    React.useEffect(() => {
      if (!trapped) return;
      const handleFocusIn = (event: FocusEvent) => {
        if (focusScopesStack.active !== scope) return;
        const target = event.target as HTMLElement | null;
        if (container?.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      };
      const handleFocusOut = (event: FocusEvent) => {
        if (focusScopesStack.active !== scope) return;
        const relatedTarget = event.relatedTarget as HTMLElement | null;
        if (relatedTarget === null) return;
        if (!container?.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      };
      const handleMutations = (mutations: MutationRecord[]) => {
        const focusedEl = document.activeElement as HTMLElement | null;
        if (focusedEl !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) {
            focus(container, { select: true });
          }
        }
      };
      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);
      const mutationObserver = new MutationObserver(handleMutations);
      if (container) {
        mutationObserver.observe(container, { childList: true, subtree: true });
      }
      return () => {
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
        mutationObserver.disconnect();
      };
    }, [trapped, container, scope]);

    // Manage scope stack & mount/unmount focus
    React.useEffect(() => {
      if (!container) return;
      focusScopesStack.add(scope);
      const previouslyFocusedElement = document.activeElement as HTMLElement | null;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);

      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }

      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(scope);
        }, 0);
      };
    }, [container, onMountAutoFocus, onUnmountAutoFocus, scope]);

    // Keyboard tab cycling
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (!loop && !trapped) return;
        if (scope.paused) return;
        const isTabKey = event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey;
        const focusedElement = document.activeElement as HTMLElement | null;
        if (!isTabKey || !focusedElement) return;
        const containerEl = event.currentTarget as HTMLElement;
        const [first, last] = getTabbableEdges(containerEl);
        const hasTabbable = first && last;
        if (!hasTabbable) {
          if (focusedElement === containerEl) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, { select: true });
          }
        }
      },
      [loop, trapped, scope.paused],
    );

    return (
      <Primitive.div
        tabIndex={-1}
        {...scopeProps}
        ref={composedRefs}
        onKeyDown={handleKeyDown}
      />
    );
  },
);
FocusScope.displayName = 'FocusScope';

/* ── helpers ─────────────────────────────────────────────────────────── */

function focus(element?: FocusableTarget | null, { select = false } = {}) {
  if (element && (element as HTMLElement).focus) {
    const previouslyFocusedElement = document.activeElement;
    (element as HTMLElement).focus({ preventScroll: true });
    if (
      element !== previouslyFocusedElement &&
      isSelectableInput(element as HTMLElement) &&
      select
    ) {
      (element as HTMLInputElement).select();
    }
  }
}

function focusFirst(candidates: HTMLElement[], { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}

function getTabbableEdges(container: HTMLElement): [HTMLElement | undefined, HTMLElement | undefined] {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}

function getTabbableCandidates(container: HTMLElement): HTMLElement[] {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: Node) => {
      const el = node as HTMLElement;
      const isHiddenInput = el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'hidden';
      if (el.hasAttribute('disabled') || el.hasAttribute('hidden') || isHiddenInput) {
        return NodeFilter.FILTER_SKIP;
      }
      return el.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);
  return nodes;
}

function findVisible(elements: HTMLElement[], container: HTMLElement): HTMLElement | undefined {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) return element;
  }
  return undefined;
}

function isHidden(node: HTMLElement, { upTo }: { upTo?: HTMLElement } = {}): boolean {
  if (getComputedStyle(node).visibility === 'hidden') return true;
  let current: HTMLElement | null = node;
  while (current) {
    if (upTo !== undefined && current === upTo) return false;
    if (getComputedStyle(current).display === 'none') return true;
    current = current.parentElement;
  }
  return false;
}

function isSelectableInput(element: HTMLElement): element is HTMLInputElement {
  return element instanceof HTMLInputElement && 'select' in element;
}

function removeLinks(items: HTMLElement[]): HTMLElement[] {
  return items.filter((item) => item.tagName !== 'A');
}

/* ── stack ───────────────────────────────────────────────────────────── */

type FocusScopeAPI = { paused: boolean; pause: () => void; resume: () => void };

const focusScopesStack = createFocusScopesStack();

function createFocusScopesStack() {
  let stack: FocusScopeAPI[] = [];
  return {
    add(focusScope: FocusScopeAPI) {
      const active = stack[0];
      if (focusScope !== active) active?.pause();
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope: FocusScopeAPI) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    },
    get active() {
      return stack[0];
    },
  };
}

function arrayRemove<T>(arr: T[], item: T): T[] {
  const newArr = [...arr];
  const idx = newArr.indexOf(item);
  if (idx !== -1) newArr.splice(idx, 1);
  return newArr;
}

export { FocusScope };
export type { FocusScopeProps };
