"use client";

import Link from "next/link";
import React, { CSSProperties } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Options as SplideOptions } from "@splidejs/splide";

import { type CategoryData, categoryDatas } from "@lib/data";

import "@splidejs/react-splide/css";

const importantCatas = ["original", "comic"];

const CategoryItem = ({ category }: { category: CategoryData }) => {
	return (
		<SplideSlide className="inline-block">
			<Link
				href={category.url}
				className="group flex items-center justify-center gap-1 px-4 py-2"
				style={
					{
						"--deco-text": `${importantCatas.includes(category.id) ? "#3399CC" : " var(--accent-300-rgb)"}`,
					} as CSSProperties
				}
			>
				<b
					className={
						"scale-x-125 text-2xl font-medium leading-none text-[var(--deco-text)]"
					}
				>
					#
				</b>
				<span className="block translate-y-[2px] text-lg font-medium leading-none text-ash-900 group-hover:text-ash-600 group-active:text-ash-300">
					{category.name}
				</span>
			</Link>
		</SplideSlide>
	);
};

const CategoriesList = () => {
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
				{categoryDatas.map((category) => (
					<CategoryItem key={category.id} {...{ category }} />
				))}
			</Splide>
		</section>
	);
};

export default CategoriesList;
