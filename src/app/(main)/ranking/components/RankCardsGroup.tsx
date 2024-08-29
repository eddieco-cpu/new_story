"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

import {
	type ProductCardType,
	type FetchedProductCardListType,
} from "@/types/product";

import RankCard from "./RankCard";
import Loading from "@/components/Loading";

import { getData, SHOW_STORE_PRODUCT_LIST } from "@/lib/api";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

//
const findType = (leaderboard: string, timing: string): string => {
	//
	if (leaderboard === "b" && timing === "t") return "12";
	if (leaderboard === "b" && timing === "m") return "9";
	if (leaderboard === "b" && timing === "w") return "6";

	if (leaderboard === "c" && timing === "t") return "13";
	if (leaderboard === "c" && timing === "m") return "10";
	if (leaderboard === "c" && timing === "w") return "7";

	if (leaderboard === "p" && timing === "t") return "1";
	if (leaderboard === "p" && timing === "m") return "11";
	if (leaderboard === "p" && timing === "w") return "8";

	return "";
};

export default function RankCardsGroup() {
	//
	const searchParams = useSearchParams();
	const [cards, setCards] = useState<ProductCardType[]>([]);

	const leaderboard = searchParams?.get("leaderboard") || "b";
	const timing = searchParams?.get("timing") || "t";
	const category = searchParams?.get("category") || "";

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		//
		setIsLoading(() => true);
		const type = findType(leaderboard, timing);

		if (!type) {
			setCards(() => []);
			setIsLoading(() => false);
			return;
		}
		async function handleFetchCards() {
			try {
				const { data } = await getData(
					BASE_PATH +
						SHOW_STORE_PRODUCT_LIST +
						`?amount_per_page=60&page=1&type=${type}&category=${category}`
				);
				const fetchedData = data as FetchedProductCardListType;
				//console.log("fetchedData.list: ", fetchedData.list);
				setCards(() => [...fetchedData.list]);
				setIsLoading(() => false);
			} catch (err) {
				console.log("error: ", err);
			}
		}
		handleFetchCards();
	}, [searchParams]);

	return (
		<>
			{isLoading ? (
				<div className="flex h-[45vh] items-center justify-center">
					<Loading className="text-2xl *:text-ash-500" />
				</div>
			) : (
				<ul className="m-auto grid grid-cols-3 gap-x-[30px] gap-y-10 max-xl:grid-cols-2 max-lg:gap-x-10 max-md:grid-cols-1">
					{cards.map((card, index) => (
						<RankCard key={card.id} {...{ card, index }} />
					))}
				</ul>
			)}
		</>
	);
}
