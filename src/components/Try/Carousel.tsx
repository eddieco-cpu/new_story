'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
//import 'embla-carousel/embla-carousel.css';

const CarouselComponent = () => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  //const [emblaRef, emblaApi] = useEmblaCarousel(options)

  return (
    <div className=' overflow-hidden' ref={emblaRef}>
      <div className='flex justify-start items-center gap-2 text-3xl'>
        <div className=' shrink-0 flex justify-center items-center w-80 aspect-square bg-red-400'>A</div>
        <div className=' shrink-0 flex justify-center items-center h-80 aspect-video  bg-blue-400'>B</div>
        <div className=' shrink-0 flex justify-center items-center w-80 aspect-square bg-green-400'>C</div>
        <div className=' shrink-0 flex justify-center items-center h-80  w-64  bg-yellow-300'>D</div>
      </div>
    </div>
  );
};

export default CarouselComponent;
