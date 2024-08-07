import Image from "next/image";
import Link from "next/link";

import { fetchDataWithCookieInServer } from "@/lib/api";

import { type NewsType } from "@/types";
import { type CateData, type FetchedCateData } from "@/types/cate";
import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import FilterNav from "./components/FilterNav";
import FilterCate from "./components/FilterCate";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle } from "@/components/customUI";

import RankCardsGroup from "./components/RankCardsGroup";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

//
export default async function Page() {
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
	return (
		<section>
			<div className="py-5 max-md:px-5">
				<NewsSlider newsArray={newsArray} />
			</div>
			<section className="pb-5 max-md:hidden">
				<Breadcrumb />
			</section>
			<section className="mb-16 px-6">
				{/* -- */}
				<div className="mb-5 flex items-center justify-start pb-2 pt-3 md:gap-4">
					<UiTitle className="">排行榜</UiTitle>
					<FilterCate categoryDatas={categoryDatas} />
				</div>

				{/* -- */}
				<FilterNav />

				{/* -- */}
				<RankCardsGroup />
			</section>
		</section>
	);
}
