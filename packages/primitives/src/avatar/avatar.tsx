'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import type {
  AvatarRootProps,
  AvatarImageProps,
  AvatarFallbackProps,
  ImageLoadingStatus,
} from './avatar.types';

interface AvatarContextValue {
  imageLoadingStatus: ImageLoadingStatus;
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => void;
}

const [AvatarProvider, useAvatarContext] = createContext<AvatarContextValue>('Avatar');

const Root = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  (props, forwardedRef) => {
    const [imageLoadingStatus, setImageLoadingStatus] =
      React.useState<ImageLoadingStatus>('idle');
    return (
      <AvatarProvider
        imageLoadingStatus={imageLoadingStatus}
        onImageLoadingStatusChange={setImageLoadingStatus}
      >
        <Primitive.span {...props} ref={forwardedRef} />
      </AvatarProvider>
    );
  },
);
Root.displayName = 'Avatar.Root';

const Image = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  (props, forwardedRef) => {
    const { src, onLoadingStatusChange = () => {}, ...imageProps } = props;
    const ctx = useAvatarContext('Avatar.Image');
    const status = useImageLoadingStatus(src);

    const handleLoadingStatusChange = React.useCallback(
      (s: ImageLoadingStatus) => {
        onLoadingStatusChange(s);
        ctx.onImageLoadingStatusChange(s);
      },
      [onLoadingStatusChange, ctx],
    );

    React.useEffect(() => {
      if (status !== 'idle') handleLoadingStatusChange(status);
    }, [status, handleLoadingStatusChange]);

    return status === 'loaded' ? (
      <Primitive.img {...imageProps} ref={forwardedRef} src={src} />
    ) : null;
  },
);
Image.displayName = 'Avatar.Image';

const Fallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  (props, forwardedRef) => {
    const { delayMs, ...fallbackProps } = props;
    const ctx = useAvatarContext('Avatar.Fallback');
    const [canRender, setCanRender] = React.useState(delayMs === undefined);

    React.useEffect(() => {
      if (delayMs === undefined) return undefined;
      const timerId = window.setTimeout(() => setCanRender(true), delayMs);
      return () => window.clearTimeout(timerId);
    }, [delayMs]);

    return canRender && ctx.imageLoadingStatus !== 'loaded' ? (
      <Primitive.span {...fallbackProps} ref={forwardedRef} />
    ) : null;
  },
);
Fallback.displayName = 'Avatar.Fallback';

/* ── helpers ─────────────────────────────────────────────────────────── */

function useImageLoadingStatus(src?: string): ImageLoadingStatus {
  const [status, setStatus] = React.useState<ImageLoadingStatus>('idle');

  React.useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    setStatus('loading');
    img.onload = () => {
      if (!cancelled) setStatus('loaded');
    };
    img.onerror = () => {
      if (!cancelled) setStatus('error');
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return status;
}

export { Root, Image, Fallback };
