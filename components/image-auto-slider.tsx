"use client";

import Image from "next/image";

export function ImageAutoSlider({
  images,
  caption,
  accent = "#1a1a1a",
}: {
  images: string[];
  caption?: string;
  accent?: string;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const doubled = [...images, ...images];

  return (
    <figure>
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max gap-4 animate-marquee"
          style={{ animationDuration: "36s" }}
        >
          {doubled.map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 aspect-square w-[218px] overflow-hidden rounded-2xl border-0 sm:w-[312px]"
              style={{ backgroundColor: accent }}
            >
              <Image
                src={`${base}${src}`}
                alt=""
                fill
                sizes="312px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
