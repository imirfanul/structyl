'use client';

import * as React from 'react';
import { useComposedRefs } from './_internal';
import { Slot } from './slot';

type CollectionElement = HTMLElement;
type ItemData<I> = { ref: React.RefObject<CollectionElement | null> } & I;

interface CollectionContextValue<I> {
  collectionRef: React.RefObject<CollectionElement | null>;
  itemMap: Map<React.RefObject<CollectionElement | null>, ItemData<I>>;
}

/**
 * Create an ordered collection for tracking child items in DOM order.
 * Used by RovingFocusGroup, Menu, Select, etc. to expose
 * `getItems()` returning items sorted as they appear in the DOM.
 */
function createCollection<I extends Record<string, unknown> = Record<string, unknown>>(name: string) {
  const CollectionContext = React.createContext<CollectionContextValue<I>>({
    collectionRef: { current: null },
    itemMap: new Map(),
  });

  const CollectionProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const collectionRef = React.useRef<CollectionElement | null>(null);
    const itemMap = React.useRef(new Map<React.RefObject<CollectionElement | null>, ItemData<I>>()).current;
    const value = React.useMemo(() => ({ collectionRef, itemMap }), [itemMap]);
    return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
  };
  CollectionProvider.displayName = `${name}CollectionProvider`;

  const CollectionSlot = React.forwardRef<CollectionElement, { children: React.ReactNode }>(
    ({ children }, forwardedRef) => {
      const context = React.useContext(CollectionContext);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return <Slot ref={composedRefs}>{children}</Slot>;
    },
  );
  CollectionSlot.displayName = `${name}CollectionSlot`;

  const ITEM_DATA_ATTR = `data-${name.toLowerCase()}-collection-item`;

  type ItemSlotProps = { children: React.ReactNode } & I;

  const CollectionItemSlot = React.forwardRef<CollectionElement, ItemSlotProps>(
    (props, forwardedRef) => {
      const { children, ...itemData } = props as { children: React.ReactNode } & Record<string, unknown>;
      const ref = React.useRef<CollectionElement | null>(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = React.useContext(CollectionContext);

      React.useEffect(() => {
        context.itemMap.set(ref, { ref, ...(itemData as unknown as I) });
        return () => {
          context.itemMap.delete(ref);
        };
      });

      return (
        <Slot {...{ [ITEM_DATA_ATTR]: '' }} ref={composedRefs}>
          {children}
        </Slot>
      );
    },
  );
  CollectionItemSlot.displayName = `${name}CollectionItemSlot`;

  function useCollection(): () => Array<ItemData<I>> {
    const context = React.useContext(CollectionContext);

    return React.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(
        collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`),
      );
      const items = Array.from(context.itemMap.values());
      items.sort(
        (a, b) =>
          orderedNodes.indexOf(a.ref.current as Element) -
          orderedNodes.indexOf(b.ref.current as Element),
      );
      return items;
    }, [context.collectionRef, context.itemMap]);
  }

  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection,
  ] as const;
}

export { createCollection };
