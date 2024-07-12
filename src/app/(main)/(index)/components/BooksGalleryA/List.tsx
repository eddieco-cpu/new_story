"use client";

import Link from "next/link";
import React, { useState } from "react";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import { UiTitle, UiSection } from "@/components/customUI";
import FreeGlide from "@/components/customUI/FreeGlide";
import NestedLink from "@/components/customUI/NestedLink";

import { type BookCard } from "./index";

export default function List({ bookCards }: { bookCards: BookCard[] }) {
	const [hoveredIndex, setHoveredIndex] = useState<number>(0);
	return (
		<nav className="grid gap-4">
			{bookCards.map((card, i) => (
				<Link
					key={card.id}
					href={card.link}
					className={
						"group max-md:w-[calc(100vw-40px)] md:w-[286px] " +
						`${i === hoveredIndex ? " grid h-[146px] grid-cols-[auto_1fr] gap-2" : "max-md:grid max-md:h-[146px] max-md:grid-cols-[auto_1fr] max-md:gap-2"}`
					}
					onMouseEnter={() => setHoveredIndex(i)}
				>
					<picture
						className={
							"pic-base book-base h-[146px] " +
							`${i === hoveredIndex ? "" : "md:hidden"}`
						}
					>
						<img
							src={card.picture}
							alt=""
							className="transition-transform duration-300 max-md:group-hover:scale-110 max-md:group-active:scale-110"
						/>
					</picture>
					<article
						className={
							"flex justify-start" +
							`${
								i === hoveredIndex
									? " h-[146px] w-full flex-col items-start gap-2"
									: ` items-center max-md:h-[146px] max-md:w-full max-md:flex-col max-md:items-start max-md:gap-2 md:w-[286px] md:before:flex md:before:h-6 md:before:w-6 md:before:items-center md:before:justify-center md:before:content-['⦁']`
							}`
						}
					>
						<h3
							className={
								"w-full text-lg font-normal text-ash-900 max-md:group-hover:text-accent-300 max-md:group-active:text-accent-220 " +
								`${i === hoveredIndex ? "line-clamp-2 h-14" : "line-clamp-1 max-md:line-clamp-2 max-md:h-14"}`
							}
						>
							{card.title}
						</h3>
						<p
							className={
								"line-clamp-1 w-full text-base font-normal text-primary-200 " +
								`${i === hoveredIndex ? "" : "md:hidden"}`
							}
						>
							<NestedLink
								link={card.authorLink}
								className="text-inherit hover:text-accent-250 active:text-accent-220"
							>
								{card.author}
							</NestedLink>
						</p>
						<p
							className={
								"line-clamp-3 h-16 text-sm font-normal text-ash-600 " +
								`${i === hoveredIndex ? "" : "md:hidden"}`
							}
						>
							{card.content}
						</p>
					</article>
				</Link>
			))}
		</nav>
	);
}
