import Image from "next/image";
import Link from "next/link";

import { NewsType } from "@/types";
import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import FilterNav from "./components/FilterNav";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle } from "@/components/ui";
import NestedLink from "@/components/ui/NestedLink";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

const currentActivities = Array.from({ length: 16 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		type: randomText(4, 6),
		title: randomText(10, 40),
		dateStart: formatDateToYYYYMMDD(new Date()),
		dateEnd: formatDateToYYYYMMDD(new Date()),
		picture: randomPicture(),
		link: "",
	})
);

const rankBooks = Array.from({ length: 16 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	authorLink: "",
	link: "",
	picture: randomPicture(),
	amount: Math.floor(Math.random() * 10000),
}));

function formatDateToYYYYMMDD(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	};
	const formatter = new Intl.DateTimeFormat("en-CA", options);
	return formatter.format(date).replace(/-/g, ".");
}

const highlightColors = [
	"rgb(248, 136, 136)",
	"rgb(255, 154, 115)",
	"rgb(245, 206, 104)",
];

export default function Cate() {
	return (
		<section>
			<section className="py-5 max-md:px-5">
				<NewsSlider newsArray={newsArray} />
			</section>
			<section className="pb-5 max-md:hidden">
				<Breadcrumb />
			</section>
			<section className="mb-16 px-6">
				<UiTitle className="mb-5">排行榜</UiTitle>

				<FilterNav />

				{/* -- */}
				{/*  max-xl:grid-cols-3 max-lg:w-[calc(286*2px+20px)] max-lg:grid-cols-2 max-md:w-[286px] max-md:grid-cols-1 */}
				<ul className="m-auto grid grid-cols-3 gap-x-[30px] gap-y-10 max-xl:grid-cols-2 max-lg:gap-x-10 max-md:grid-cols-1">
					{rankBooks.map((card, i) => (
						<li className="group relative h-[167px]" key={card.id}>
							<Link
								href={card.link}
								className="grid h-[167px] grid-cols-[auto_1fr] gap-2 transition-all duration-500 group-hover:translate-y-[-10px]"
							>
								<picture className="pic-base book-base h-full">
									<img
										src={card.picture}
										alt=""
										className="transition-all duration-700 group-hover:scale-110"
									/>
								</picture>
								<article className="grid h-full w-full grid-rows-[auto_1fr_auto] gap-2">
									<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
										{card.title}
									</h3>
									<div>
										<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
											<NestedLink
												link={card.authorLink}
												className="text-inherit transition-all duration-300 hover:text-accent-250 active:text-accent-220"
											>
												{card.author}
											</NestedLink>
										</p>
									</div>
									<p className="line-clamp-1 w-full text-sm font-normal text-ash-600">
										收藏數 {card.amount}
									</p>
								</article>
							</Link>
							<div
								className={
									"absolute bottom-0 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white " +
									`${i < 3 ? " md:h-16 md:w-16" : ""}`
								}
							>
								<p
									className={
										"text-4xl font-bold italic leading-none text-[rgb(141,141,141)] " +
										`${i < 3 ? " -translate-y-4 text-7xl" : ""}`
									}
									style={i < 3 ? { color: highlightColors[i] } : {}}
								>
									{i + 1}
								</p>
							</div>
						</li>
					))}
				</ul>
			</section>
		</section>
	);
}
