'use client';

import * as React from 'react';
import {
  useControllableState,
  useId,
  useComposedRefs,
  useCallbackRef,
  composeEventHandlers,
} from './_internal';
import { createContext } from './create-context';
import { createCollection } from './collection';
import { useDirection, type Direction } from './direction';
import { Primitive } from './primitive';

type Orientation = 'horizontal' | 'vertical';

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus';
const EVENT_OPTIONS = { bubbles: false, cancelable: true } as const;

/* ── collection ──────────────────────────────────────────────────────── */

type ItemData = { id: string; focusable: boolean; active: boolean };
const [Collection, useCollection] = createCollection<ItemData>('RovingFocus');

/* ── context ─────────────────────────────────────────────────────────── */

interface RovingContextValue {
  orientation?: Orientation;
  dir: Direction;
  loop: boolean;
  currentTabStopId: string | null;
  onItemFocus: (tabStopId: string) => void;
  onItemShiftTab: () => void;
  onFocusableItemAdd: () => void;
  onFocusableItemRemove: () => void;
}

const [RovingFocusProvider, useRovingFocusContext] =
  createContext<RovingContextValue>('RovingFocusGroup');

/* ── Group ───────────────────────────────────────────────────────────── */

interface RovingFocusGroupProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  orientation?: Orientation;
  dir?: Direction;
  loop?: boolean;
  currentTabStopId?: string | null;
  defaultCurrentTabStopId?: string;
  onCurrentTabStopIdChange?: (tabStopId: string | null) => void;
  onEntryFocus?: (event: Event) => void;
  preventScrollOnEntryFocus?: boolean;
}

const RovingFocusGroup = React.forwardRef<HTMLDivElement, RovingFocusGroupProps>(
  (props, forwardedRef) => {
    const {
      orientation,
      dir: dirProp,
      loop = false,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onCurrentTabStopIdChange,
      onEntryFocus,
      preventScrollOnEntryFocus = false,
      ...groupProps
    } = props;

    const ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const dir = useDirection(dirProp);
    const [currentTabStopId = null, setCurrentTabStopId] = useControllableState({
      prop: currentTabStopIdProp,
      defaultProp: defaultCurrentTabStopId,
      onChange: onCurrentTabStopIdChange,
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
    const handleEntryFocus = useCallbackRef(onEntryFocus);
    const getItems = useCollection();
    const isClickFocusRef = React.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = React.useState(0);

    React.useEffect(() => {
      const node = ref.current;
      if (!node) return;
      const handler = (e: Event) => handleEntryFocus(e);
      node.addEventListener(ENTRY_FOCUS, handler);
      return () => node.removeEventListener(ENTRY_FOCUS, handler);
    }, [handleEntryFocus]);

    return (
      <Collection.Provider>
        <Collection.Slot>
          <RovingFocusProvider
            orientation={orientation}
            dir={dir}
            loop={loop}
            currentTabStopId={currentTabStopId}
            onItemFocus={React.useCallback(
              (id) => setCurrentTabStopId(id),
              [setCurrentTabStopId],
            )}
            onItemShiftTab={React.useCallback(() => setIsTabbingBackOut(true), [])}
            onFocusableItemAdd={React.useCallback(
              () => setFocusableItemsCount((c) => c + 1),
              [],
            )}
            onFocusableItemRemove={React.useCallback(
              () => setFocusableItemsCount((c) => c - 1),
              [],
            )}
          >
            <Primitive.div
              tabIndex={isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0}
              data-orientation={orientation}
              {...groupProps}
              ref={composedRefs}
              style={{ outline: 'none', ...groupProps.style }}
              onMouseDown={composeEventHandlers(groupProps.onMouseDown, () => {
                isClickFocusRef.current = true;
              })}
              onFocus={composeEventHandlers(groupProps.onFocus, (event) => {
                const isKeyboardFocus = !isClickFocusRef.current;
                if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                  const entryEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
                  event.currentTarget.dispatchEvent(entryEvent);
                  if (!entryEvent.defaultPrevented) {
                    const items = getItems().filter((item) => item.focusable);
                    const activeItem = items.find((item) => item.active);
                    const currentItem = items.find((item) => item.id === currentTabStopId);
                    const candidateItems = [activeItem, currentItem, ...items].filter(
                      Boolean,
                    ) as typeof items;
                    focusFirst(
                      candidateItems.map((i) => i.ref.current!).filter(Boolean),
                      preventScrollOnEntryFocus,
                    );
                  }
                }
                isClickFocusRef.current = false;
              })}
              onBlur={composeEventHandlers(groupProps.onBlur, () => setIsTabbingBackOut(false))}
            />
          </RovingFocusProvider>
        </Collection.Slot>
      </Collection.Provider>
    );
  },
);
RovingFocusGroup.displayName = 'RovingFocusGroup';

/* ── Item ────────────────────────────────────────────────────────────── */

interface RovingFocusItemProps extends React.ComponentPropsWithoutRef<typeof Primitive.span> {
  tabStopId?: string;
  focusable?: boolean;
  active?: boolean;
}

const RovingFocusItem = React.forwardRef<HTMLSpanElement, RovingFocusItemProps>(
  (props, forwardedRef) => {
    const { focusable = true, active = false, tabStopId, ...itemProps } = props;
    const autoId = useId();
    const id = tabStopId ?? autoId;
    const context = useRovingFocusContext('RovingFocusItem');
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection();

    const { onFocusableItemAdd, onFocusableItemRemove } = context;
    React.useEffect(() => {
      if (!focusable) return undefined;
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);

    return (
      <Collection.ItemSlot id={id} focusable={focusable} active={active}>
        <Primitive.span
          tabIndex={isCurrentTabStop ? 0 : -1}
          data-orientation={context.orientation}
          {...itemProps}
          ref={forwardedRef}
          onMouseDown={composeEventHandlers(itemProps.onMouseDown, (event) => {
            if (!focusable) event.preventDefault();
            else context.onItemFocus(id);
          })}
          onFocus={composeEventHandlers(itemProps.onFocus, () => context.onItemFocus(id))}
          onKeyDown={composeEventHandlers(itemProps.onKeyDown, (event) => {
            if (event.key === 'Tab' && event.shiftKey) {
              context.onItemShiftTab();
              return;
            }
            if (event.target !== event.currentTarget) return;
            const focusIntent = getFocusIntent(event, context.orientation, context.dir);
            if (focusIntent !== undefined) {
              if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
              event.preventDefault();
              let candidateNodes = getItems()
                .filter((item) => item.focusable)
                .map((item) => item.ref.current!)
                .filter(Boolean);
              if (focusIntent === 'last') candidateNodes.reverse();
              else if (focusIntent === 'prev' || focusIntent === 'next') {
                if (focusIntent === 'prev') candidateNodes.reverse();
                const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement);
                candidateNodes = context.loop
                  ? wrapArray(candidateNodes, currentIndex + 1)
                  : candidateNodes.slice(currentIndex + 1);
              }
              setTimeout(() => focusFirst(candidateNodes));
            }
          })}
        />
      </Collection.ItemSlot>
    );
  },
);
RovingFocusItem.displayName = 'RovingFocusItem';

/* ── helpers ─────────────────────────────────────────────────────────── */

type FocusIntent = 'first' | 'last' | 'prev' | 'next';

const MAP_KEY_TO_FOCUS_INTENT: Record<string, FocusIntent> = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last',
};

function getDirectionAwareKey(key: string, dir?: Direction): string {
  if (dir !== 'rtl') return key;
  if (key === 'ArrowLeft') return 'ArrowRight';
  if (key === 'ArrowRight') return 'ArrowLeft';
  return key;
}

function getFocusIntent(
  event: React.KeyboardEvent,
  orientation?: Orientation,
  dir?: Direction,
): FocusIntent | undefined {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key)) return undefined;
  if (orientation === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key)) return undefined;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}

function focusFirst(candidates: HTMLElement[], preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}

function wrapArray<T>(arr: T[], startIdx: number): T[] {
  return arr.map((_, index) => arr[(startIdx + index) % arr.length] as T);
}

export { RovingFocusGroup, RovingFocusItem };
export type { RovingFocusGroupProps, RovingFocusItemProps, Orientation };
