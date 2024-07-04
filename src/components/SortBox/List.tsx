"use client";

import React, { useState } from "react";
import { SortBook } from "@/types/cate";

import Item from "./Item";

export default function List({
	cardSorts,
	className,
}: {
	cardSorts: SortBook[];
	className: string;
}) {
	const [hoveredIndex, setHoveredIndex] = useState<number>(0);
	return (
		<ul
			className={
				className + " sort-item-group grid gap-[5px] rounded-b-lg px-4 pb-4"
			}
		>
			{cardSorts.map((sort, i) => (
				<Item key={sort.id} {...{ sort, i, hoveredIndex, setHoveredIndex }} />
			))}
		</ul>
	);
}
