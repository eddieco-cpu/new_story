"use client";

import Link from "next/link";
import React, { CSSProperties } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Options as SplideOptions } from "@splidejs/splide";

import { type CateData, type FetchedCateData } from "@/types/cate";

import "@splidejs/react-splide/css";

const importantCatas = ["1", "2"];

const CategoryItem = ({ category }: { category: CateData }) => {
	return (
		<SplideSlide className="inline-block">
			<Link
				href={`/cate/${category.id}`}
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

const CategoriesList = ({ categoryDatas }: { categoryDatas: CateData[] }) => {
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
