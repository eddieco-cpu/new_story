import Image from "next/image";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";

import { fetchDataWithCookieInServer } from "@/lib/api";

import { type NewsType } from "@/types";
import { type CateData, type FetchedCateData } from "@/types/cate";
import { type ResponseOfFetchedProductCardType } from "@/types/product";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import SearchProvider from "@contexts/searchContext";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";

import FilterAside from "./components/FilterAside";
import FilterBar from "./components/FilterBar";

import MoreProductsCardGroup from "./components/MoreProductsCardGroup";
import ProductsCard from "./components/ProductsCard";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

//
export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	//
	console.log("searchParams: \n", searchParams);

	let searchObject: { [key: string]: string } = {
		type: searchParams.type || "1",
		amount_per_page: "60",
		page: "1",
		complete: searchParams.complete || "",
		update_time: searchParams.update_time || "",
		words: searchParams.words || "",
		category: searchParams.category || "",
	};

	//
	const fetchedCategoryData = await fetchDataWithCookieInServer(
		"https://story-onlinelab.udn.com/story3/ShowCategory?store=Y",
		""
	);
	let categoryDatas: CateData[] = [];
	if (fetchedCategoryData && fetchedCategoryData.list) {
		categoryDatas = [...fetchedCategoryData.list];
	}

	//
	const toFetchSearchParams = new URLSearchParams();
	Object.keys(searchObject).forEach((key) => {
		if (searchObject[key]) {
			toFetchSearchParams.append(key, searchObject[key]);
		}
	});

	let fetchedCateData = null;
	try {
		fetchedCateData = await fetchDataWithCookieInServer(
			`https://story-onlinelab.udn.com/story3/ShowStoreProductList?${toFetchSearchParams.toString()}`,
			""
		);
		if (!fetchedCateData || fetchedCateData.status !== "200") {
			throw new Error("fetched error");
		}
		//
	} catch (error) {
		//500 error
		console.log("error: \n", error);
		notFound(); //to be continued
	}
	const successfulFetchedCateData: ResponseOfFetchedProductCardType =
		fetchedCateData;
	console.log("successfulFetchedCateData: \n", successfulFetchedCateData);

	return (
		<section>
			<SearchProvider>
				{/* -- */}
				<section className="py-5 max-md:px-5">
					<NewsSlider newsArray={newsArray} />
				</section>

				{/* -- */}
				<section className="pb-5 max-md:hidden">
					<Breadcrumb />
				</section>

				{/* -- */}
				<section className="grid grid-cols-[auto_1fr] gap-7 max-md:grid-cols-1">
					{/* --- */}
					<aside className="w-60 max-md:w-full">
						<FilterAside categoryDatas={categoryDatas} />
					</aside>

					{/* --- */}
					<section>
						<section className="grid grid-cols-1 gap-5">
							{/* ---- */}
							<FilterBar />

							{/* ---- */}
							<div>
								<ul className="m-auto grid grid-cols-5 gap-7 pb-7 max-xl:w-[calc(180*3px+28*2px)] max-xl:grid-cols-3 max-lg:w-[calc(180*2px+28*1px)] max-lg:grid-cols-2 max-md:max-w-[calc(100vw-12px)] max-md:gap-5">
									{successfulFetchedCateData.list.length > 0 &&
										successfulFetchedCateData.list.map((card) => (
											<ProductsCard key={card.id} {...{ card }} />
										))}
								</ul>
								{successfulFetchedCateData &&
									Number(successfulFetchedCateData.data_count) >
										Number(searchObject.amount_per_page) && (
										<MoreProductsCardGroup
											groupClassName="m-auto grid grid-cols-5 gap-7 max-xl:w-[calc(180*3px+28*2px)] max-xl:grid-cols-3 max-lg:w-[calc(180*2px+28*1px)] max-lg:grid-cols-2 max-md:max-w-[calc(100vw-12px)] max-md:gap-5"
											totalAmount={Number(successfulFetchedCateData.data_count)}
											loadedAmount={Number(searchObject.amount_per_page)}
										/>
									)}
							</div>
						</section>
					</section>
				</section>
			</SearchProvider>
		</section>
	);
}
