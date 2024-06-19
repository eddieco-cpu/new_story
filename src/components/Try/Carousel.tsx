"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
//import 'embla-carousel/embla-carousel.css';

const CarouselComponent = () => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  //const [emblaRef, emblaApi] = useEmblaCarousel(options)

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex items-center justify-start gap-2 text-3xl">
        <div className="flex aspect-square w-80 shrink-0 items-center justify-center bg-red-400">
          A
        </div>
        <div className="flex aspect-video h-80 shrink-0 items-center justify-center bg-blue-400">
          B
        </div>
        <div className="flex aspect-square w-80 shrink-0 items-center justify-center bg-green-400">
          C
        </div>
        <div className="flex h-80 w-64 shrink-0 items-center justify-center bg-yellow-300">
          D
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
