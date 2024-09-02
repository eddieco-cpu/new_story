import Image from "next/image";
import Link from "next/link";

import React, { Suspense } from "react";
import {
	fetchDataWithCookieInServer,
	STORY_DOMAIN,
	SHOW_CATEGORY,
} from "@/lib/api";

import { type NewsType } from "@/types";
import { type CateData, type FetchedCateData } from "@/types/cate";
import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle, UiSection } from "@/components/customUI";
import { UiButton } from "@/components/customUI/client";

import FreeGlide from "@/components/customUI/FreeGlide";
import NestedLink from "@/components/customUI/NestedLink";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

const publishers = Array.from({ length: 46 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	link: "",
	picture: randomPicture(),
}));

//
export default async function Page() {
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
		<section>
			<div className="py-5 max-md:px-5">
				<NewsSlider newsArray={newsArray} />
			</div>
			<section className="pb-5 max-md:hidden">
				<Breadcrumb />
			</section>
			<section>
				<UiTitle className="mb-4 max-md:px-5">出版社專區</UiTitle>
				<div className="mx-auto flex w-[calc(180*6px+30*5px)] flex-wrap content-start justify-start gap-[30px] max-xl:w-[calc(180*4px+30*3px)] max-lg:w-[calc(180*3px+30*2px)] max-md:w-[calc(160*2px+20*1px)] max-md:gap-5">
					{publishers.map((publisher) => (
						<div
							key={publisher.id}
							className="group w-[180px] max-md:w-[160px]"
						>
							<Link
								href={publisher.link}
								className="block w-full transition-transform group-hover:-translate-y-4"
							>
								<picture className="pic-base h-[95px] w-[180px] rounded max-md:h-[84px] max-md:w-[160px]">
									<img src={publisher.picture} alt="" />
								</picture>
								<div className="py-[10px]">
									<p className="line-clamp-1 w-full text-center text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220 max-md:text-base">
										{publisher.title}
									</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</section>
		</section>
	);
}
