import { useState, type ImgHTMLAttributes } from 'react';

interface FallbackImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackSrc: string;
}

/** <img> that swaps to a placeholder when the current `src` fails to load (re-armed whenever `src` changes). */
export function FallbackImg({ fallbackSrc, onError, alt, src, ...rest }: FallbackImgProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const showFallback = failedSrc !== undefined && failedSrc === src;

  return (
    <img
      {...rest}
      alt={alt}
      src={showFallback ? fallbackSrc : src}
      onError={(e) => {
        if (!showFallback) setFailedSrc(src);
        onError?.(e);
      }}
    />
  );
}
