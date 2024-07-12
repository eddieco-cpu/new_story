import Image from "next/image";
import Link from "next/link";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import { UiTitle } from "@/components/customUI";

//
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

export default function BoxRecommendation() {
	return (
		<section>
			<UiTitle titleLink="/cate" className="mb-4">
				猜你喜歡
			</UiTitle>
			<ul className="grid gap-4 max-lg:grid-flow-col max-lg:overflow-x-auto max-lg:scrollbar-hide lg:grid-cols-1">
				{novelCards.map((card) => (
					<li
						className="relative h-[146px] max-lg:h-[290px] max-lg:w-[140px]"
						key={card.id}
					>
						<Link
							href={card.link}
							className="grid h-[146px] grid-cols-[auto_1fr] gap-2 max-lg:h-[290px] max-lg:w-[140px] max-lg:grid-cols-1"
						>
							<picture className="pic-base book-base h-full max-lg:h-auto max-lg:w-full">
								<img src={card.picture} alt="" />
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									{card.author}
								</p>
								{/* <p className="mt-1 line-clamp-2 w-full text-sm font-normal text-ash-600">
									{card.content}
								</p> */}
							</article>
						</Link>
						<Link
							href={card.typeLink}
							className="absolute bottom-0 left-[114px] flex h-6 w-[75px] items-center justify-center rounded bg-[rgb(235,235,235)] text-sm font-normal text-ash-600 max-lg:hidden"
						>
							{card.type}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
