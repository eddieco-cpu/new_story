"use client";

import Link from "next/link";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Options as SplideOptions } from "@splidejs/splide";

import { Categories, Category } from "@/types/cate";

import "@splidejs/react-splide/css";

const CategoryItem = ({ category }: { category: Category }) => {
	return (
		<SplideSlide className="inline-block">
			<Link
				href={category.url}
				className="flex items-center justify-center gap-1 px-4 py-2"
			>
				<b className="scale-x-125 text-2xl font-medium leading-none text-accent-300">
					#
				</b>
				<span className="text-lg font-medium leading-none text-ash-900">
					{category.name}
				</span>
			</Link>
		</SplideSlide>
	);
};

const CategoriesList = ({ categories }: { categories: Categories }) => {
	//
	const options: SplideOptions = {
		type: "slide",
		arrows: false,
		pagination: false,
		autoWidth: true,
		//resetProgress: true,
		drag: "free",
	};

	return (
		<section className="">
			<Splide options={options}>
				{categories.map((category) => (
					<CategoryItem key={category.id} {...{ category }} />
				))}
			</Splide>
		</section>
	);
};

export default CategoriesList;
