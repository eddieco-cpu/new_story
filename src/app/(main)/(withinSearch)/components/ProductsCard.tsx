import Link from "next/link";
import React from "react";

import { type ProductCardType } from "@/types/product";

export default function ProductsCard({ card }: { card: ProductCardType }) {
	return (
		<li
			className="group w-[180px] max-md:max-w-[calc(50vw-10px-6px)]"
			key={card.id}
		>
			<Link
				href={`/products/${card.id}`}
				className="block overflow-hidden rounded bg-white transition-all duration-500 group-hover:translate-y-[-10px]"
			>
				<picture className="pic-base book-base w-full rounded-none">
					<img
						src={card.imgcover}
						alt=""
						className="transition-all duration-700 group-hover:scale-110"
					/>
				</picture>
				<article className="p-[10px]">
					<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 transition-all duration-300 group-hover:text-accent-300">
						{card.title}
					</h3>
				</article>
			</Link>
		</li>
	);
}
