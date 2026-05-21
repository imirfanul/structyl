import type * as React from 'react';

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AvatarRootProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}

export interface AvatarImageProps extends React.ComponentPropsWithoutRef<'img'> {
  asChild?: boolean;
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
  /** Delay in ms before the fallback is shown, to avoid flicker on fast image loads. */
  delayMs?: number;
}
