import Image from "next/image";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import React, { Suspense } from "react";

import {
	fetchDataWithCookieInServer,
	STORY_DOMAIN,
	SHOW_CATEGORY,
} from "@/lib/api";

import { type CateData, type FetchedCateData } from "@/types/cate";
import { type FetchedProductCardListType } from "@/types/product";

import SearchProvider from "@contexts/searchContext";

import FilterAside from "./FilterAside";
import FilterBar from "./FilterBar";

import ProductsCardGroup from "./ProductsCardGroup";
import Loading from "@/components/Loading";

//
export default async function PageComponent({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	//
	console.log("searchParams: \n", searchParams);

	//
	const fetchedCategoryData = await fetchDataWithCookieInServer(
		STORY_DOMAIN + SHOW_CATEGORY + "?store=Y",
		""
	);
	let categoryDatas: CateData[] = [];
	if (fetchedCategoryData && fetchedCategoryData.list) {
		categoryDatas = [...fetchedCategoryData.list];
	}

	//
	return (
		<section className="grid grid-cols-[auto_1fr] gap-7 max-md:grid-cols-1">
			<SearchProvider>
				{/* --- */}
				<aside className="w-60 max-md:w-full">
					<Suspense
						fallback={
							<div>
								<Loading />
							</div>
						}
					>
						<FilterAside categoryDatas={categoryDatas} />
					</Suspense>
				</aside>

				{/* --- */}
				<section>
					<section className="grid grid-cols-1 gap-5">
						{/* ---- */}
						<Suspense
							fallback={
								<div>
									<Loading />
								</div>
							}
						>
							<FilterBar />
						</Suspense>

						{/* -- client only -- */}
						<div>
							<Suspense
								fallback={
									<div>
										<Loading />
									</div>
								}
							>
								<ProductsCardGroup groupClassName="m-auto grid grid-cols-5 gap-7 max-xl:w-[calc(180*3px+28*2px)] max-xl:grid-cols-3 max-lg:w-[calc(180*2px+28*1px)] max-lg:grid-cols-2 max-md:max-w-[calc(100vw-12px)] max-md:gap-5" />
							</Suspense>
						</div>
					</section>
				</section>
			</SearchProvider>
		</section>
	);
}
