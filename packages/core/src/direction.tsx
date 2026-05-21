'use client';

import * as React from 'react';

type Direction = 'ltr' | 'rtl';

const DirectionContext = React.createContext<Direction | undefined>(undefined);

interface DirectionProviderProps {
  children?: React.ReactNode;
  dir: Direction;
}

const DirectionProvider: React.FC<DirectionProviderProps> = ({ dir, children }) => (
  <DirectionContext.Provider value={dir}>{children}</DirectionContext.Provider>
);

export function useDirection(localDir?: Direction): Direction {
  const globalDir = React.useContext(DirectionContext);
  return localDir ?? globalDir ?? 'ltr';
}

export { DirectionProvider };
export type { Direction };
