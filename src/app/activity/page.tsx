import Image from "next/image";
import Link from "next/link";

import { NewsType } from "@/types";
import randomPicture from "@utils/randomPicture";
import randomText from "@utils/randomText";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle } from "@/components/UI";
import { link } from "fs";

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

const pastActivities = Array.from({ length: 16 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	type: randomText(4, 6),
	title: randomText(10, 40),
	dateStart: formatDateToYYYYMMDD(new Date()),
	dateEnd: formatDateToYYYYMMDD(new Date()),
	picture: randomPicture(),
	link: "",
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
				<UiTitle className="mb-5">進行中的活動</UiTitle>
				<ul className="m-auto grid grid-cols-4 gap-7 max-xl:grid-cols-3 max-lg:w-[calc(286*2px+20px)] max-lg:grid-cols-2 max-md:w-[286px] max-md:grid-cols-1">
					{currentActivities.map((activity) => (
						<li key={activity.id} className="group h-[360px] w-[286px]">
							<Link
								href={activity.link}
								className="block h-[360px] w-[286px] overflow-hidden rounded-lg bg-white transition-all duration-500 group-hover:translate-y-[-10px]"
							>
								<picture className="pic-base aspect-[570/475] w-full">
									<img
										src={activity.picture}
										alt={activity.title}
										width={200}
										height={200}
										className="transition-all duration-700 group-hover:scale-110"
									/>
								</picture>
								<article className="grid gap-1 px-4 py-2">
									<p className="text-sm font-medium text-accent-300">
										{activity.type}
									</p>
									<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 transition-all duration-300 group-hover:text-accent-300">
										{activity.title}
									</h3>

									<p className="text-sm text-ash-500">
										<time>{activity.dateStart}</time>
										{" - "}
										<time>{activity.dateEnd}</time>
									</p>
								</article>
							</Link>
						</li>
					))}
				</ul>
			</section>
			<section className="mb-16 px-6">
				<UiTitle className="mb-5">歷史活動</UiTitle>
				<ul className="m-auto grid grid-cols-4 gap-7 max-xl:grid-cols-3 max-lg:w-[calc(286*2px+20px)] max-lg:grid-cols-2 max-md:w-[286px] max-md:grid-cols-1">
					{pastActivities.map((activity) => (
						// group
						<li key={activity.id} className="h-[360px] w-[286px]">
							<Link
								href={activity.link}
								className="relative block h-[360px] w-[286px] overflow-hidden rounded-lg bg-white transition-all duration-500 before:absolute before:left-0 before:top-0 before:z-[1] before:block before:h-full before:w-full before:bg-[rgb(70,21,0)] before:opacity-60 before:content-[''] group-hover:translate-y-[-10px]"
							>
								<picture className="pic-base aspect-[570/475] w-full">
									<img
										src={activity.picture}
										alt={activity.title}
										width={200}
										height={200}
										className="transition-all duration-700 group-hover:scale-110"
									/>
								</picture>
								<article className="grid gap-1 px-4 py-2">
									<p className="text-sm font-medium text-accent-300">
										{activity.type}
									</p>
									<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 transition-all duration-300 group-hover:text-accent-300">
										{activity.title}
									</h3>

									<p className="text-sm text-ash-500">
										<time>{activity.dateStart}</time>
										{" - "}
										<time>{activity.dateEnd}</time>
									</p>
								</article>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</section>
	);
}
