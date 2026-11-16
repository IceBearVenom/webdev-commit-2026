import type { ImgHTMLAttributes } from 'react';

interface FallbackImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackSrc: string;
}

/** <img> that swaps to a placeholder once if the original fails to load. */
export function FallbackImg({ fallbackSrc, onError, alt, ...rest }: FallbackImgProps) {
  return (
    <img
      {...rest}
      alt={alt}
      onError={(e) => {
        const el = e.currentTarget;
        if (!el.dataset.failed) {
          el.dataset.failed = '1';
          el.src = fallbackSrc;
        }
        onError?.(e);
      }}
    />
  );
}
