"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; 
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export default function ProductImageCarousel({ images, name }: Props) {
  // Define Autoplay outside or inline as a plugin
  // delay: 3000 (3 seconds)
  // stopOnInteraction: false (prevents it from stopping forever if user touches it)
  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay]);

  const displayImages = images?.length > 0 ? images : ["https://via.placeholder.com/400"];

  return (
    <div className="overflow-hidden h-full w-full relative" ref={emblaRef}>
      <div className="flex h-full">
        {displayImages.map((src, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
            <Image
              src={src.startsWith("http") ? src : "https://via.placeholder.com/400"}
              alt={`${name} - ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Visual Dot Indicators */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {displayImages.map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/60 shadow-md border border-black/10" />
          ))}
        </div>
      )}
    </div>
  );
}