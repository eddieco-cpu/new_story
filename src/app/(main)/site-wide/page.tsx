import Image from "next/image";
import Link from "next/link";

import { fetchDataWithCookieInServer } from "@/lib/api";

import { type NewsType } from "@/types";
import { type CateData, type FetchedCateData } from "@/types/cate";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import SearchProvider from "@contexts/searchContext";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";

import FilterAside from "./components/FilterAside";
import FilterBar from "./components/FilterBar";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

const rankBooks = Array.from({ length: 60 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	authorLink: "",
	link: "",
	picture: randomPicture(),
	amount: Math.floor(Math.random() * 10000),
}));

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
					<section className="grid grid-cols-1 gap-5">
						{/* ---- */}
						<FilterBar />

						{/* ---- */}
						<ul className="m-auto grid grid-cols-5 gap-7 pb-7 max-xl:w-[calc(180*3px+28*2px)] max-xl:grid-cols-3 max-lg:w-[calc(180*2px+28*1px)] max-lg:grid-cols-2 max-md:max-w-[calc(100vw-12px)] max-md:gap-5">
							{rankBooks.map((card) => (
								<li
									className="group w-[180px] max-md:max-w-[calc(50vw-10px-6px)]"
									key={card.id}
								>
									<Link
										href={card.link}
										className="block overflow-hidden rounded bg-white transition-all duration-500 group-hover:translate-y-[-10px]"
									>
										<picture className="pic-base book-base w-full rounded-none">
											<img
												src={card.picture}
												alt=""
												className="transition-all duration-700 group-hover:scale-110"
											/>
										</picture>
										<article className="p-[10px]">
											<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 transition-all duration-300 group-hover:text-accent-300">
												{card.title}
											</h3>
										</article>
									</Link>
								</li>
							))}
						</ul>
					</section>
				</section>
			</SearchProvider>
		</section>
	);
}
