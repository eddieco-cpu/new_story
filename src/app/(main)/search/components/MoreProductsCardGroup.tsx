"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import {
	type ProductCardType,
	type ResponseOfFetchedProductCardType,
} from "@/types/product";

import ProductCard from "../components/ProductsCard";
import LoadMore from "@/components/customUI/LoadMore";

import { getData } from "@/lib/api";

export default function MoreProductsCardGroup({
	groupClassName,
	totalAmount,
	loadedAmount,
}: {
	groupClassName?: string;
	totalAmount: number;
	loadedAmount: number;
}) {
	//
	const searchParams = useSearchParams();
	const [cards, setCards] = useState<ProductCardType[]>([]);

	useEffect(() => {
		setCards(() => []);
	}, [searchParams]);

	async function handleFetchCards() {
		console.log("searchParams.toString(): ", searchParams.toString());
		try {
			const { data } = await getData(
				`/story3/ShowStoreProductList?amount_per_page=${loadedAmount}&page=${Math.floor((cards.length + loadedAmount) / loadedAmount) + 1}&${searchParams.toString()}`
			);
			const fetchedData = data as ResponseOfFetchedProductCardType;
			setCards((arr) => [...arr, ...fetchedData.list]);
		} catch (err) {
			console.log("error: ", err);
		}
	}

	return (
		<>
			<ul className={groupClassName || ""}>
				{cards.map((card) => (
					<ProductCard key={card.id} {...{ card }} />
				))}
			</ul>
			{totalAmount > loadedAmount + cards.length && (
				<LoadMore
					onClick={handleFetchCards}
					totalAmount={totalAmount}
					loadedAmount={loadedAmount + cards.length}
				/>
			)}
		</>
	);
}
