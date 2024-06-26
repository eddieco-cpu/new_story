"use client";

import Link from "next/link";
import React from "react";

import { SortBook } from "@/types/cate";

export default function Item({
	sort,
	i,
	hoveredIndex,
	setHoveredIndex,
}: {
	sort: SortBook;
	i: number;
	hoveredIndex: number;
	setHoveredIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<li
			key={sort.id}
			className={"sort-item" + (i === hoveredIndex ? " sort-item--active" : "")}
			onMouseEnter={() => setHoveredIndex(i)}
		>
			<div className="sort-item-sort">
				<p className="sort-item-sort__icon">{i + 1}</p>
			</div>

			<Link href={sort.link} className="sort-item-link">
				<article
					className={
						"sort-item-link__art " +
						(sort.amount ? " max-w-[calc(100%-78px)]" : "")
					}
				>
					<h3 className="sort-item-link__art-title">{sort.title}</h3>
					<p className="sort-item-link__art-para">{sort.author}</p>
					{sort.amount && (
						<p className="sort-item-link__art-amount">{sort.amount}</p>
					)}
				</article>

				<picture className="pic-base book-base w-[70px] flex-shrink-0">
					<img src={sort.picture} alt="" />
				</picture>
			</Link>
		</li>
	);
}
