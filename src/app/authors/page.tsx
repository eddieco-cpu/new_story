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

const rankBooks = Array.from({ length: 16 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	authorLink: "",
	link: "",
	picture: randomPicture(),
	amount: Math.floor(Math.random() * 10000),
}));

export default function Page() {
	return (
		<section>
			<section className="py-5">
				<NewsSlider newsArray={newsArray} />
			</section>
			<section className="pb-5">
				<Breadcrumb />
			</section>
			<section className="mb-5 rounded-2xl bg-landscape-400 px-32 py-12 max-lg:px-5 max-lg:py-6">
				{/* -- */}
				<div className="flex items-center justify-start gap-4">
					<picture className="pic-base aspect-square w-[120px] shrink-0 rounded-full">
						<img src={author.avatar} alt={author.name} />
					</picture>
					<article className="flex flex-col items-start justify-start gap-2">
						<p className="flex items-center justify-start gap-1">
							<img src="/images/author_icon.png" className="block w-5" alt="" />
							<span className="text-sm text-secondary-500">簽約作家</span>
						</p>
						<div className="max-lg: flex items-center justify-start gap-4 max-lg:flex-col max-md:gap-2">
							<h2 className="line-clamp-1 text-2xl font-normal text-ash-900 max-md:line-clamp-2 max-md:h-16">
								{author.name}
							</h2>
							<UiButton
								variant="tertiary"
								className="flex items-center justify-center gap-2 max-lg:ml-0"
							>
								<i className="i-done text-base text-accent-250"></i>
								<span className="text-inherit">已追蹤</span>
							</UiButton>
						</div>
					</article>
				</div>

				{/* -- */}
				<div className="mb-6 pl-[calc(120px+8px)] max-lg:mt-6 max-md:flex max-md:items-center max-md:justify-center max-md:pl-0">
					<div className="flex items-center justify-start">
						<p className="flex items-end justify-center gap-2 px-2">
							<span className="text-sm leading-none text-ash-600">作品數</span>
							<b className="text-lg leading-none">{author.storiesNumber}</b>
						</p>
						<div className="h-[22px] w-[1px] bg-ash-500"></div>
						<p className="flex items-end justify-center gap-2 px-2">
							<span className="text-sm leading-none text-ash-600">追蹤數</span>
							<b className="text-lg leading-none">{author.followersNumber}</b>
						</p>
					</div>
				</div>

				{/* -- */}
				<ArticleExpansion article={author.about}></ArticleExpansion>
			</section>
			<section className="mb-16 px-6">
				{/* -- */}
				<div className="border-b border-landscape-400 px-6">
					<p className="inline-flex items-end justify-center gap-1 border-b-2 border-accent-300 px-6 py-4">
						<b className="text-lg font-bold text-accent-300">作品</b>
						<span className="text-sm text-ash-850">(32)</span>
					</p>
				</div>

				{/* -- */}
				<ul className="m-auto grid grid-cols-2 gap-x-[30px] gap-y-10 pb-8 pt-4 max-xl:grid-cols-1">
					{rankBooks.map((card, i) => (
						<li
							className="group relative h-[205px] max-md:h-[162px]"
							key={card.id}
						>
							<Link
								href={card.link}
								className="grid h-full grid-cols-[auto_1fr] gap-2 transition-all duration-500 hover:translate-y-[-5px]"
							>
								<picture className="pic-base book-base h-full">
									<img
										src={card.picture}
										alt=""
										className="transition-all duration-700 group-hover:scale-110"
									/>
								</picture>
								<article className="grid h-full w-full grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:items-stretch max-md:justify-start max-md:gap-1">
									<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 transition-all duration-300 group-hover:text-accent-300 group-active:text-accent-220 max-md:h-[52px]">
										{card.title}
									</h3>
									<div className="mt-[-2px] flex items-center justify-start gap-2 overflow-hidden max-md:hidden">
										<UiTag
											el="span"
											className="border-secondary-450 text-secondary-450"
										>
											簽約
										</UiTag>
										<UiTag
											el="span"
											className="border-prompt-info text-prompt-info"
										>
											連載中
										</UiTag>
										<UiTag
											el="nestedLink"
											link="#"
											className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
										>
											愛情言情
										</UiTag>
										<UiTag
											el="nestedLink"
											link="#"
											className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
										>
											愛情言情
										</UiTag>
										<UiTag
											el="nestedLink"
											link="#"
											className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
										>
											愛情言情
										</UiTag>
									</div>
									<div>
										<p className="line-clamp-1 w-full text-sm font-normal text-primary-200">
											<span className="text-inherit">{card.author}</span>
										</p>
									</div>
									<div>
										<p className="line-clamp-1 w-full text-sm font-normal text-primary-200">
											<span className="text-ash-600">更新至</span>{" "}
											<span className="text-inherit">{card.author}</span>
										</p>
									</div>
									<p className="line-clamp-1 w-full text-sm font-normal text-ash-600">
										<time className="text-ash-600">2024-03-26</time>
									</p>
								</article>
							</Link>
							<div className="absolute bottom-0 right-0 flex items-center justify-center gap-4 max-md:gap-3">
								<UiButton
									variant="secondary"
									className="flex h-[34px] items-center justify-center gap-2 max-md:h-8 max-md:w-[95px] max-md:gap-1 max-md:text-sm"
								>
									<i className="i-heart-empty text-inherit"></i>
									<span className="text-inherit">收藏</span>
								</UiButton>
								<UiButton
									variant="primary"
									className="h-[34px] max-md:h-8 max-md:w-[95px] max-md:text-sm"
								>
									開始閱讀
								</UiButton>
							</div>
						</li>
					))}
				</ul>
			</section>
		</section>
	);
}
