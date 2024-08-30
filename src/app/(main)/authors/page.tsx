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

import { imgClassNameInGroupHover } from "@lib/data";
import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import Loading from "@/components/Loading";

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

const recommendedAuthors = Array.from({ length: 37 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		name: randomText(3, 20),
		link: "",
		picture: randomPicture(),
		content: randomText(20, 100),
	})
);

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

			<UiSection titleChildren="人氣作家" className="px-6 pt-0">
				<div className="mx-auto flex flex-wrap content-start justify-start gap-x-[30px] gap-y-10 max-lg:w-[calc(286*2px+30px)] max-md:w-full max-md:flex-col max-md:flex-nowrap max-md:items-center">
					{recommendedAuthors.map((author) => (
						<div
							className="w-[285px] px-2 pb-[1px] text-center max-xl:w-[286px] max-md:w-full"
							key={author.id}
						>
							<Link href={author.link} className="group block">
								<picture className="pic-base m-auto aspect-square w-[140px] rounded-full">
									<img
										src={author.picture}
										alt=""
										className={imgClassNameInGroupHover}
									/>
								</picture>
								<article className="p-2">
									<h3 className="mb-5 line-clamp-1 h-7 text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
										{author.name}
									</h3>
									<div className="mb-2 flex items-center justify-center gap-6">
										<UiButton
											variant="secondary"
											className="mx-0 h-9 w-28 text-sm max-md:w-36"
										>
											更多作品
										</UiButton>
										<UiButton
											variant="secondary"
											className="mx-0 h-9 w-28 text-sm max-md:w-36"
										>
											追蹤
										</UiButton>
									</div>
									<p className="line-clamp-3 h-[62px] text-left text-sm font-normal text-ash-600">
										{author.content}
									</p>
								</article>
							</Link>
						</div>
					))}
				</div>
			</UiSection>
		</section>
	);
}
