import Image from "next/image";
import Link from "next/link";

import { NewsType } from "@/types";
import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle } from "@/components/customUI";
import { Sorting as SortingIcon } from "@/components/customUI/svg";

import FilterAside from "./components/FilterAside";

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

const filterCates = [
	{
		id: 11,
		title: "全部",
		link: "",
	},
	{
		id: 12,
		title: "琅琅原創",
		link: "",
	},
	{
		id: 13,
		title: "漫畫",
		link: "",
	},
	{
		id: 14,
		title: "言情",
		link: "",
	},
	{
		id: 15,
		title: "輕小說",
		link: "",
	},
	{
		id: 21,
		title: "玄幻",
		link: "",
	},
	{
		id: 22,
		title: "懸疑",
		link: "",
	},
	{
		id: 23,
		title: "冒險",
		link: "",
	},
	{
		id: 24,
		title: "靈異",
		link: "",
	},
	{
		id: 25,
		title: "BL",
		link: "",
	},
	{
		id: 35,
		title: "18+",
		link: "",
	},
];

const filterWordCounts = [
	{
		id: 31,
		title: "全部",
		link: "",
	},
	{
		id: 32,
		title: "1萬以下",
		link: "",
	},
	{
		id: 33,
		title: "1萬~3萬",
		link: "",
	},
	{
		id: 34,
		title: "3萬~5萬",
		link: "",
	},
	{
		id: 35,
		title: "5萬~10萬",
		link: "",
	},
	{
		id: 36,
		title: "10萬以上",
		link: "",
	},
];

const filterStatus = [
	{
		id: 41,
		title: "全部",
		link: "",
	},
	{
		id: 42,
		title: "連載中",
		link: "",
	},
	{
		id: 43,
		title: "已完結",
		link: "",
	},
];

const filterTimeAreas = [
	{
		id: 51,
		title: "全部",
		link: "",
	},
	{
		id: 52,
		title: "3日內",
		link: "",
	},
	{
		id: 53,
		title: "7日內",
		link: "",
	},
	{
		id: 54,
		title: "半月內",
		link: "",
	},
	{
		id: 55,
		title: "一月內",
		link: "",
	},
];

export default function Page() {
	return (
		<section>
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
					<FilterAside />
				</aside>

				{/* --- */}
				<section className="grid grid-cols-1 gap-5">
					{/* ---- */}
					<div className="flex items-center justify-between max-md:px-5">
						<UiTitle>全站分類</UiTitle>
						<nav className="flex items-center justify-center gap-2 *:flex-shrink-0">
							<span className="flex items-center justify-center gap-1 *:flex-shrink-0">
								<SortingIcon />
								<b className="text-sm font-normal text-ash-600">排序</b>
							</span>
						</nav>
					</div>

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
		</section>
	);
}
