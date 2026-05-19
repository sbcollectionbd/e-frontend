"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Props {
  images: string[];
  name: string;
}

export default function ProductImageCarousel({ images, name }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);

  // Track active slide for dot indicator
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const displayImages = images?.length > 0 ? images : [""];

  return (
    <div className="overflow-hidden h-full w-full relative" ref={emblaRef}>
      <div className="flex h-full">
        {displayImages.map((src, index) => (
          <div
            key={index}
            className="relative flex-[0_0_100%] min-w-0 h-full"
          >
            <Image
              src={src}
              alt={`${name} - ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              // ✅ Only load first image eagerly, rest are lazy
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* ✅ Active dot indicator (was static before) */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {displayImages.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 shadow-md border border-black/10 ${
                i === selectedIndex
                  ? "w-5 bg-white"
                  : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}