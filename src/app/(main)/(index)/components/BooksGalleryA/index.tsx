import Link from "next/link";

import { imgClassNameInGroupHover } from "@tools/data";
import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import { UiSection } from "@/components/customUI";
import FreeGlide from "@/components/customUI/FreeGlide";
import NestedLink from "@/components/customUI/NestedLink";

import List from "./List";

export type BookCard = {
	id: number;
	title: string;
	author: string;
	authorLink: string;
	link: string;
	picture: string;
	content: string;
};

const bookCards = Array.from({ length: 31 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	authorLink: "",
	link: "",
	picture: randomPicture(),
	content: randomText(20, 100),
}));

export default function BooksGalleryA() {
	return (
		<UiSection
			titleChildren="2023收藏百大書榜 - 原創篇"
			titleLink="/cate"
			className="py-5 max-md:pl-5"
		>
			<div className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-5 max-lg:grid-cols-1 max-lg:grid-rows-[auto_auto] max-md:gap-y-4">
				<div className="w-[calc(220px+64px)] px-8 max-xl:w-[220px] max-xl:px-0 max-lg:w-auto">
					<Link
						href={bookCards[0].link}
						className="group w-[220px] max-lg:grid max-lg:w-auto max-lg:grid-cols-[auto_1fr] max-lg:grid-rows-1 max-lg:gap-3 max-md:h-[146px] max-md:w-[calc(100vw-40px)]"
					>
						<picture className="pic-base book-base mb-2 w-full max-lg:mb-0 max-lg:w-[140px] max-md:h-[146px] max-md:w-auto">
							<img
								src={bookCards[0].picture}
								alt=""
								className={imgClassNameInGroupHover}
							/>
						</picture>
						<article
							className={`mb-6 h-[183px] text-center max-lg:mb-0 max-lg:h-auto max-lg:text-left max-md:flex max-md:h-[146px] max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-2`}
						>
							<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220 max-md:mb-0">
								{bookCards[0].title}
							</h3>
							<p className="mb-9 line-clamp-1 text-base font-normal text-primary-200 max-md:mb-0">
								<NestedLink
									link={bookCards[0].authorLink}
									className="text-inherit hover:text-accent-250 active:text-accent-220"
								>
									{bookCards[0].author}
								</NestedLink>
							</p>
							<p className="line-clamp-3 h-[62px] text-left text-sm font-normal text-ash-600 max-md:h-16">
								{bookCards[0].content}
							</p>
						</article>
					</Link>
				</div>
				<FreeGlide className="free-glide-flex" disableInMoblie={true}>
					<div className="grid grid-cols-3 gap-x-7 gap-y-4 max-md:grid-cols-1">
						<List bookCards={bookCards.slice(1, 11)} />
						<List bookCards={bookCards.slice(11, 21)} />
						<List bookCards={bookCards.slice(21)} />
					</div>
				</FreeGlide>
			</div>
		</UiSection>
	);
}
