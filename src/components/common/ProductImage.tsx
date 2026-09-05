"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ProductImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fill = true,
  width,
  height,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackSrc = "/products/fallback-phone.svg";
  const imageSource = hasError || !src ? fallbackSrc : src;

  if (fill) {
    return (
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-zinc-100/60 animate-pulse rounded-xl" />
        )}
        <Image
          src={imageSource}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className}`}
        />
      </div>
    );
  }

  return (
    <div className="relative inline-block overflow-hidden">
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-zinc-100/60 animate-pulse rounded-xl"
          style={{ width: width || 100, height: height || 100 }}
        />
      )}
      <Image
        src={imageSource}
        alt={alt}
        width={width || 200}
        height={height || 200}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
      />
    </div>
  );
}
