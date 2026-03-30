import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

export function MdxImage({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== "string") {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt || "blog-post-image"}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto object-cover"
    />
  );
}
