import Image from "next/image";
import Link from "next/link";

import { NewsType } from "@/types";
import randomPicture from "@utils/randomPicture";
import randomText from "@utils/randomText";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle } from "@/components/UI";
import { UiButton, UiTag } from "@/components/UI/client";
import NestedLink from "@/components/UI/NestedLink";

import ArticleExpansion from "./components/ArticleExpansion";

import BoxRecommendation from "./components/BoxRecommendation";
import BoxCreator from "./components/BoxCreator";
import BoxOverview from "./components/BoxOverview";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

const author = {
	id: 1,
	name: randomText(20, 60),
	avatar: randomPicture(),
	about: randomText(300, 800),
	storiesNumber: Math.floor(Math.random() * 100),
	followersNumber: Math.floor(Math.random() * 100),
};

const novelCards = Array.from({ length: 12 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	link: "",
	picture: randomPicture(),
	//content: randomText(20, 100),
	type: randomText(2, 4),
	typeLink: "",
}));

export default function Page() {
	return (
		<section>
			<section className="py-5 max-md:px-5">
				<NewsSlider newsArray={newsArray} />
			</section>
			<section className="pb-5 max-md:hidden">
				<Breadcrumb />
			</section>

			{/* - */}
			<section className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-7 gap-y-5 max-xl:grid-rows-[auto_auto_auto] max-lg:flex max-lg:flex-col max-lg:items-stretch max-lg:justify-start max-md:gap-y-2">
				{/* left_top */}
				<div className="rounded-2xl bg-landscape-400 px-6 py-4 max-xl:col-span-2 max-md:rounded-none max-md:px-5">
					<BoxOverview></BoxOverview>
				</div>

				{/* right_top */}
				<div className="col-start-2 row-start-1 aspect-[310/407] w-[310px] rounded-2xl bg-landscape-400 p-3 max-xl:col-span-2 max-xl:col-start-1 max-xl:row-start-2 max-xl:aspect-auto max-xl:min-h-6 max-xl:w-auto max-md:rounded-none">
					<BoxCreator></BoxCreator>
				</div>

				{/* left_bottom */}
				<div className="col-start-1 row-start-2 max-xl:row-start-3">
					{/* --- */}
					<article className="h-[3000px] bg-slate-100 ring-1"></article>
				</div>

				{/* right_bottom */}
				<div className="col-start-2 row-start-2 w-[310px] max-xl:row-start-3 max-lg:w-auto">
					<div className="rounded-2xl bg-landscape-400 p-6">
						<BoxRecommendation></BoxRecommendation>
					</div>
				</div>
			</section>
		</section>
	);
}
