import React from "react";
import Link from "next/link";

import { type ProductCardType } from "@/types/product";
import NestedLink from "@/components/customUI/NestedLink";

const highlightColors = [
	"rgb(248, 136, 136)",
	"rgb(255, 154, 115)",
	"rgb(245, 206, 104)",
];

export default function RankCard({
	card,
	index,
}: {
	card: ProductCardType;
	index: number;
}) {
	return (
		<li className="group relative h-[167px]">
			<Link
				href={`/products/${card.id}`}
				className="grid h-[167px] grid-cols-[auto_1fr] gap-2 transition-all duration-500 group-hover:translate-y-[-10px]"
			>
				<picture className="pic-base book-base h-full">
					<img
						src={card.imgcover}
						alt=""
						className="transition-all duration-700 group-hover:scale-110"
					/>
				</picture>
				<article className="grid h-full w-full grid-rows-[auto_1fr_auto] gap-2">
					<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
						{card.title}
					</h3>
					<div>
						<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
							{/* <NestedLink
								link={`/authors/${card.author}`}
								className="text-inherit transition-all duration-300 hover:text-accent-250 active:text-accent-220"
							>
								{card.author}
							</NestedLink> */}
							<span className="text-inherit transition-all duration-300">
								{card.author}
							</span>
						</p>
					</div>
					<p className="line-clamp-1 w-full text-sm font-normal text-ash-600">
						收藏數 {card.collection}
					</p>
				</article>
			</Link>
			<div
				className={
					"absolute bottom-0 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white " +
					`${index < 3 ? " md:h-16 md:w-16" : ""}`
				}
			>
				<p
					className={
						"text-4xl font-bold italic leading-none text-[rgb(141,141,141)] " +
						`${index < 3 ? " -translate-y-4 text-7xl" : ""}`
					}
					style={index < 3 ? { color: highlightColors[index] } : {}}
				>
					{index + 1}
				</p>
			</div>
		</li>
	);
}
