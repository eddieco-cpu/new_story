'use client';

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Options as SplideOptions } from '@splidejs/splide';

import '@splidejs/react-splide/css';

//import randomPicture from '../../utils/randomPicture';

const photos = [
  'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/10/02/draft/6890302.jpg',
  'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2017/08/30/draft/3938967.jpg',
  'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/10/16/draft/6948338.jpg',
  'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/10/12/99/6932740.jpg',
  'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/10/17/99/6952256.jpg',

]

const SplideComponent: React.FC = () => {
  //
  const options: SplideOptions = {
    rewind: true,
    gap: '1rem',
    type: 'loop',
    autoplay: true,
    interval: 6000,
    speed: 700,
    perPage: 1,
  };

  return (
    <section >
      <Splide options={options} aria-label='My Favorite Images'>
        {photos.map((photo, index) => (
          <SplideSlide key={index}>
            <picture className='block w-full aspect-video overflow-hidden'>
              <img
                src={photo}
                alt={`Image ${index + 1}`}
                className='block w-full h-full object-cover object-center'
              />
            </picture>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default SplideComponent;
