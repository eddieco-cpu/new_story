"use client";

import Link from "next/link";
import React, { useState } from "react";
import FreeGlide from "@/components/customUI/FreeGlide";

import { type ProductCardViaCategoryType } from "@/types/product";

export default function Introduction({
	className,
	div_items,
}: {
	className: string;
	div_items: ProductCardViaCategoryType[];
}) {
	//
	const [hoveredIndex, setHoveredIndex] = useState<number>(0);

	return (
		<div
			className={
				"grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-x-5 px-6 py-4 max-xl:gap-x-4 max-xl:px-5 max-lg:gap-y-4 " +
				className
			}
			style={
				{
					"--pic-w": "285",
					"--pic-h": "375",
					"--glide-h": "118",
				} as React.CSSProperties
			}
		>
			<Link
				href={`/products/${div_items[hoveredIndex].id}`}
				className="col-span-1 row-span-2 block aspect-[var(--pic-w)/var(--pic-h)] h-[calc(var(--pic-h)*1px)] max-lg:row-span-1 max-lg:h-[calc(var(--pic-h)*0.65px)] max-md:h-[calc(var(--pic-h)*0.5px)]"
			>
				<picture className="pic-base aspect-[var(--pic-w)/var(--pic-h)] h-full rounded-md">
					<img src={div_items[hoveredIndex].imgcover} alt="" />
				</picture>
			</Link>

			<Link
				href={`/products/${div_items[hoveredIndex].id}`}
				className="col-start-2 row-start-1 block h-[calc((var(--pic-h)-var(--glide-h))*1px)] pb-4 max-lg:h-[calc(var(--pic-h)*0.65px)] max-lg:pb-0 max-md:h-[calc(var(--pic-h)*0.5px)]"
			>
				<div className="pt-2 max-md:mr-4">
					<h2 className="line-clamp-2 h-16 text-2xl font-normal text-ash-900">
						{div_items[hoveredIndex].title}
					</h2>
					<p className="my-3 line-clamp-1 text-base font-normal text-primary-200">
						{div_items[hoveredIndex].author}
					</p>
				</div>
				<article className="line-clamp-6 h-[120px] text-sm font-normal text-ash-600 max-md:mr-4 max-md:line-clamp-3 max-md:h-[60px]">
					{div_items[hoveredIndex].summary}
				</article>
			</Link>

			{/* 700 -16 -40 -285 */}
			<div className="col-start-2 row-start-2 max-xl:w-[calc((700-16-40-285)*1px)] max-lg:col-span-2 max-lg:w-auto max-md:max-w-[calc(100vw-20px)]">
				<FreeGlide
					className="free-glide-flex gap-x-4"
					containerClassName=" max-xl:w-[calc((700-16-40-285)*1px)] max-lg:w-auto max-md:max-w-[calc(100vw-20px)] "
				>
					{div_items.map((card, i) => (
						<picture
							key={card.id}
							className={
								"pic-base book-base h-[calc(var(--glide-h)*1px)] cursor-pointer " +
								(i === hoveredIndex ? "" : " opacity-50")
							}
							onClick={() => setHoveredIndex(i)}
						>
							<img src={card.imgcover} alt="" />
						</picture>
					))}
				</FreeGlide>
			</div>
		</div>
	);
}
