"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

import LoadMore from "@/components/customUI/LoadMore";
import { type Chapter, type ProductChaptersData } from "@/types/chapter";

import { getData, SHOW_STORE_PRODUCT_CHAPTER } from "@/lib/api";

let perPageNumber = 50;

export default function ChaptersList({
	publish_article,
	productId,
	productChapters,
	className,
}: {
	publish_article: string;
	productId: string;
	productChapters: Chapter[];
	className?: string;
}) {
	//
	const [moreChapters, setMoreChapters] = useState<Chapter[]>([]);

	//
	async function handleLoadMore() {
		//
		if (!productId) return;
		var moreChaptersData: null | ProductChaptersData = null;
		try {
			const { data } = await getData(
				SHOW_STORE_PRODUCT_CHAPTER +
					`?id=${productId}
				&order_by=chapter
				&amount_per_page=${perPageNumber}
				&page=${Math.floor((productChapters.length + moreChapters.length) / perPageNumber) + 1}`
			);
			moreChaptersData = data as ProductChaptersData;
			console.log("moreChaptersData: \n", moreChaptersData);

			if (!moreChaptersData)
				throw new Error("fetch moreChaptersData error in products page");

			if (!moreChaptersData.list || moreChaptersData.list.length === 0) {
				throw new Error("no more chapters");
			}
			const moreChaptersDatalist = moreChaptersData.list as Chapter[];
			setMoreChapters((arr) => [...arr, ...moreChaptersDatalist]);
		} catch (error) {
			console.error(error);
		}
	}

	//
	return (
		<>
			<div className={className}>
				{/* <p className="flex items-center justify-end">
					<span className="flex scale-y-[120%] cursor-pointer items-center justify-center">
						<i className="i-down-2 mr-[-5px] block leading-none text-accent-300"></i>
						<i className="i-up-2 ml-[-5px] block leading-none text-ash-600"></i>
					</span>
				</p> */}
				<nav className="grid grid-cols-2 gap-x-5 gap-y-3 px-6 py-5 max-xl:px-0 max-xl:py-4 max-md:grid-cols-1">
					{[...productChapters, ...moreChapters].map((chapter) => (
						<Link
							key={chapter.chapter_id}
							href={`/piece/${productId}/${chapter.chapter_id}`}
							className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-6 py-2 hover:bg-ash-200 active:bg-ash-300 max-xl:px-2"
						>
							<span className="flex-grow text-ash-850">{chapter.title}</span>
							{chapter.right === "N" && (
								<i className="i-signin flex-shrink-0 text-accent-250"></i>
							)}
						</Link>
					))}
				</nav>
				{productId &&
					productChapters.length + moreChapters.length <
						Number(publish_article) && (
						<LoadMore
							onClick={handleLoadMore}
							totalAmount={Number(publish_article)}
							loadedAmount={productChapters.length + moreChapters.length}
						></LoadMore>
					)}
			</div>
		</>
	);
}
