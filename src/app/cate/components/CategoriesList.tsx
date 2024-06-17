'use client';

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Options as SplideOptions } from '@splidejs/splide';

import { Categories, Category } from "@/types/cate";

import '@splidejs/react-splide/css';

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <SplideSlide className=" inline-block">
      <a href="#" className="flex justify-center items-center gap-1 px-4 py-2">
        <b className=" text-2xl font-medium leading-none text-accent-300 scale-x-125">#</b>
        <span className=" text-lg font-medium text-ash-900 leading-none">{category.name}</span>
      </a>
    </SplideSlide>
  )
}


const CategoriesList = ({ categories }: { categories: Categories }) => {
  //
  const options: SplideOptions = {
    type: 'slide',
    arrows: false,
    pagination: false,
    autoWidth: true,
    //resetProgress: true,
    drag: "free",
  };

  return (
    <section className=' ring-1'>
     <Splide options={options}  >
     {
        categories.map((category) => (
          <CategoryItem key={category.id} {...{category}} />
        ))
      }
     </Splide>
    </section>
  );
};

export default CategoriesList;
