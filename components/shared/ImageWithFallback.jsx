"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function ImageWithFallback({ src, alt, className, fill, width, height, ...props }) {
  const [errored, setErrored] = useState(!src);

  if (errored) {
    return (
      <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)}>
        <ImageOff className="h-6 w-6" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
