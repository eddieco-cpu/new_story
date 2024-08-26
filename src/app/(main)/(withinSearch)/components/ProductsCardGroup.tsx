"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchContext } from "@contexts/searchContext";

import {
	type ProductCardType,
	type FetchedProductCardListType,
} from "@/types/product";

import ProductCard from "./ProductsCard";
import LoadMore from "@/components/customUI/LoadMore";

import { isValidPathSegment } from "@/tools/validator";
import { getData, SHOW_STORE_PRODUCT_LIST } from "@/lib/api";

export default function MoreProductsCardGroup({
	groupClassName,
}: {
	groupClassName?: string;
}) {
	//
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const pathnames = pathname.split("/");

	const { sortOptions, totalAmount, setTotalAmount } = useSearchContext();

	const [cards, setCards] = useState<ProductCardType[]>([]);
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

		if (
			pathnames[pathnames.length - 3] === "license" &&
			pathnames[pathnames.length - 1] === "searching"
		) {
			searchObject = isValidPathSegment(pathnames[pathnames.length - 2])
				? {
						...searchObject,
						cpstring: decodeURI(pathnames[pathnames.length - 2]),
					}
				: searchObject;
		} else {
			searchObject = searchParams?.get("searchstring")
				? {
						...searchObject,
						searchstring: searchParams?.get("searchstring") || "",
					}
				: searchObject;
		}

		try {
			const { data } = await getData(
				SHOW_STORE_PRODUCT_LIST +
					`?page=${isRefresh ? "1" : Math.floor(cards.length / amount_per_page) + 1}&${new URLSearchParams(searchObject).toString()}`
			);
			const fetchedData = data as FetchedProductCardListType;
			//console.log("fetchedData: ", fetchedData);

			//
			setTotalAmount(Number(fetchedData.data_count));

			//const fetchedDataIds = fetchedData.list.map((el) => el.id);
			//console.log("fetchedDataIds: ", fetchedDataIds); //取得的 api data 目前有重複的可能性

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
	}, [pathname, searchParams]);

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
