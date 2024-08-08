"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchContext } from "@contexts/searchContext";

import {
	type ProductCardType,
	type ResponseOfFetchedProductCardType,
} from "@/types/product";

import ProductCard from "./ProductsCard";
import LoadMore from "@/components/customUI/LoadMore";

import { getData } from "@/lib/api";

export default function MoreProductsCardGroup({
	groupClassName,
}: {
	groupClassName?: string;
}) {
	//
	const searchParams = useSearchParams();
	const { sortOptions } = useSearchContext();

	const [cards, setCards] = useState<ProductCardType[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const amount_per_page = 60;

	//
	const sortCards = useCallback(
		(cards: ProductCardType[]) => {
			const sortOption = sortOptions.find((el) => el.isSelected);

			if (sortOption) {
				const sortOptionId = sortOption.id as keyof ProductCardType;
				return cards.sort(
					(a, b) => Number(b[sortOptionId]) - Number(a[sortOptionId])
				);
			} else {
				return cards;
			}
		},
		[sortOptions]
	);

	//
	async function handleFetchCards(isRefresh: boolean) {
		//
		let searchObject: { [key: string]: string } = {
			type: "1",
			amount_per_page: amount_per_page.toString(),
			complete: searchParams?.get("complete") || "",
			update_time: searchParams?.get("update_time") || "",
			words: searchParams?.get("words") || "",
			category: searchParams?.get("category") || "",
		};

		try {
			const { data } = await getData(
				`/story3/ShowStoreProductList?page=${isRefresh ? "1" : Math.floor(cards.length / amount_per_page) + 1}&${new URLSearchParams(searchObject).toString()}`
			);
			const fetchedData = data as ResponseOfFetchedProductCardType;

			//
			setTotalAmount(Number(fetchedData.data_count));

			const fetchedDataIds = fetchedData.list.map((el) => el.id);
			console.log("fetchedDataIds: ", fetchedDataIds); //取得的 api data 目前有重複的可能性

			if (isRefresh) {
				setCards(() => [...fetchedData.list]);
			} else {
				setCards((arr) => [...arr, ...fetchedData.list]);
			}

			//
		} catch (err) {
			console.log("error: ", err);
			setCards(() => []);
		}
	}

	//
	useEffect(() => {
		handleFetchCards(true);
	}, [searchParams]);

	return (
		<>
			<ul className={groupClassName || ""}>
				{sortCards(cards).map((card) => (
					<ProductCard key={card.id} {...{ card }} />
				))}
			</ul>
			{totalAmount > cards.length && (
				<LoadMore
					onClick={() => handleFetchCards(false)}
					totalAmount={totalAmount}
					loadedAmount={cards.length}
				/>
			)}
		</>
	);
}
