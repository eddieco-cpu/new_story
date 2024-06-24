import Link from "next/link";
import { Category, Categories, SortBook } from "@/types/cate";
import { PhotoSlider, NewsType } from "@/types";

import randomPicture from "@utils/randomPicture";
import randomText from "@utils/randomText";

import PurePhotoSlider from "@/components/slider/PurePhotoSlider";
import NewsSlider from "@/components/slider/NewsSlider";
import CategoriesList from "@/components/slider/CategoriesList";

import HeroSection from "./components/HeroSection";

import SortBox from "@/components/SortBox";

import { UiTitle, UiSection } from "@/components/UI";
import FreeGlide from "@/components/UI/FreeGlide";
import NestedLink from "@/components/UI/NestedLink";

import PageNameInDev from "@/components/UI/PageNameInDev";

import "@styles/cate.scss";

const categories: Categories = [
	{
		id: "original",
		name: "琅琅原創",
		url: "",
		isEmphasis: true,
	},
	{
		id: "romance",
		name: "言情",
		url: "",
		isEmphasis: false,
	},
	{
		id: "lightNovel",
		name: "輕小說",
		url: "",
		isEmphasis: false,
	},
	{
		id: "fantasy",
		name: "玄幻",
		url: "",
		isEmphasis: false,
	},
	{
		id: "suspense",
		name: "懸疑",
		url: "",
		isEmphasis: false,
	},
	{
		id: "adventure",
		name: "冒險",
		url: "",
		isEmphasis: false,
	},
	{
		id: "supernatural",
		name: "靈異",
		url: "",
		isEmphasis: false,
	},
	{
		id: "BL",
		name: "BL",
		url: "",
		isEmphasis: false,
	},
	{
		id: "adult",
		name: "18+",
		url: "",
		isEmphasis: false,
	},
	{
		id: "comic",
		name: "漫畫",
		url: "",
		isEmphasis: true,
	},
	{
		id: "manga",
		name: "漫畫",
		url: "",
		isEmphasis: false,
	},
];

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

const photoSliders: PhotoSlider[] = Array.from(
	{ length: 6 },
	(_, i) => i + 1
).map((i) => ({
	id: `${new Date().getTime() + i}`,
	link: "",
	title: randomText(3, 20),
	alt: randomText(3, 20),
	src: randomPicture(),
}));

//
const popularCards = Array.from({ length: 8 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	link: "",
	picture: randomPicture(),
}));

const newPunblishedCards = Array.from({ length: 6 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		title: randomText(3, 20),
		author: randomText(3, 20),
		link: "",
		picture: randomPicture(),
	})
);

const newUpdatedCards = Array.from({ length: 4 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	authorLink: "",
	link: "",
	picture: randomPicture(),
	content: randomText(20, 100),
}));

const classicalCards = Array.from({ length: 12 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	link: "",
	picture: randomPicture(),
	content: randomText(20, 100),
}));

//
const mainIntroCards = Array.from({ length: 6 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	link: "",
	picture: randomPicture(),
	content: randomText(200, 400),
}));

//
const hotSorts: SortBook[] = Array.from({ length: 10 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		title: randomText(3, 20),
		author: randomText(3, 20),
		link: "",
		picture: randomPicture(),
	})
);

const viewedSorts: SortBook[] = Array.from({ length: 10 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		title: randomText(3, 20),
		author: randomText(3, 20),
		link: "",
		picture: randomPicture(),
		amount: Math.floor(Math.random() * 10000),
	})
);

const collectedSorts: SortBook[] = Array.from(
	{ length: 10 },
	(_, i) => i + 1
).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	link: "",
	picture: randomPicture(),
	amount: Math.floor(Math.random() * 10000),
}));

const newPunblishedSorts: SortBook[] = Array.from(
	{ length: 10 },
	(_, i) => i + 1
).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	link: "",
	picture: randomPicture(),
}));

export default function Cate() {
	return (
		<section>
			<section className="h-[330px] overflow-hidden max-xl:h-[calc(var(--container-width)*33/128)] max-md:aspect-[375/313] max-md:h-auto md:mt-5">
				{/* 330 | 405 */}
				<PurePhotoSlider {...{ photoSliders }} />
			</section>

			<section className="px-6 py-5">
				<NewsSlider newsArray={newsArray} />
			</section>

			<section className="px-6 py-4">
				<CategoriesList categories={categories} />
			</section>

			<section>
				<section className="mb-2 px-6">
					<UiTitle>言情</UiTitle>
				</section>
				<section className="bg-landscape-400 lg:rounded-2xl">
					<HeroSection {...{ mainIntroCards }} />
				</section>
			</section>

			<UiSection titleChildren="最近大家看甚麼" titleLink="/cate">
				<FreeGlide className="free-glide-flex w-[1240px] flex-wrap content-start items-start gap-x-8 gap-y-4">
					{popularCards.map((card) => (
						<Link
							//href={card.link}
							href={"https://health.udn.com/health/index"}
							key={card.id}
							className="grid h-[146px] w-[286px] grid-cols-[auto_1fr] gap-2"
						>
							<picture className="pic-base book-base h-full">
								<img src={card.picture} alt="" />
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									<NestedLink link="https://www.youtube.com/?app=desktop&hl=zh-tw">
										{card.author}
									</NestedLink>
								</p>
							</article>
						</Link>
					))}
				</FreeGlide>
			</UiSection>

			<UiSection titleChildren="新品上架" titleLink="/cate">
				<FreeGlide className="free-glide-flex gap-x-[30px]">
					{newPunblishedCards.map((card) => (
						<Link href={card.link} key={card.id} className="w-[180px]">
							<picture className="pic-base book-base h-full">
								<img src={card.picture} alt="" />
							</picture>
							<article className="h-[104px] p-2">
								<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900">
									{card.title}
								</h3>
								<p className="line-clamp-1 text-base font-normal text-primary-200">
									{card.author}
								</p>
							</article>
						</Link>
					))}
				</FreeGlide>
			</UiSection>

			<UiSection titleChildren="最近更新" titleLink="/cate">
				<FreeGlide className="free-glide-flex gap-x-8">
					{newUpdatedCards.map((card) => (
						<div
							key={card.id}
							className="w-[calc(220px+64px)] px-8 max-md:w-[180px] max-md:px-0"
						>
							<Link href={card.link} className="w-[220px] max-md:w-[180px]">
								<picture className="pic-base book-base mb-2 w-full">
									<img src={card.picture} alt="" />
								</picture>
								<article className="h-[183px] text-center">
									<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900">
										{card.title}
									</h3>
									<p className="mb-9 line-clamp-1 text-base font-normal text-primary-200">
										<NestedLink link={card.authorLink} className="text-inherit">
											{card.author}
										</NestedLink>
									</p>
									<p className="line-clamp-3 h-[70px] text-left text-sm font-normal text-ash-600">
										{card.content}
									</p>
								</article>
							</Link>
						</div>
					))}
				</FreeGlide>
			</UiSection>

			<section className="relative z-[2] bg-landscape-400">
				<div
					className="stretch-bg"
					style={{ "--bg": "rgb(243, 232, 223)" } as React.CSSProperties}
				></div>
				<section className="p-6">
					<UiTitle className="mb-5 justify-center">言情排行</UiTitle>
					<FreeGlide className="free-glide-flex gap-x-[30px]">
						<SortBox cardSorts={hotSorts} cardName="暢銷榜" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="瀏覽榜" cardLink="" />
						<SortBox cardSorts={collectedSorts} cardName="收藏榜" cardLink="" />
						<SortBox
							cardSorts={newPunblishedSorts}
							cardName="新書榜"
							cardLink=""
						/>
					</FreeGlide>
				</section>
			</section>

			<UiSection titleChildren="經典完本" titleLink="/cate">
				<FreeGlide className="free-glide-flex w-[1240px] flex-wrap content-start items-start gap-x-8 gap-y-4">
					{classicalCards.map((card) => (
						<Link
							href={card.link}
							key={card.id}
							className="grid h-[146px] w-[286px] grid-cols-[auto_1fr] gap-2"
						>
							<picture className="pic-base book-base h-full">
								<img src={card.picture} alt="" />
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									{card.author}
								</p>
								<p className="mt-1 line-clamp-2 w-full text-sm font-normal text-ash-600">
									{card.content}
								</p>
							</article>
						</Link>
					))}
				</FreeGlide>
			</UiSection>

			<UiSection titleChildren="新品上架" titleLink="/cate">
				<FreeGlide className="free-glide-flex gap-x-[30px]">
					{newPunblishedCards.map((card) => (
						<Link href={card.link} key={card.id} className="w-[180px]">
							<picture className="pic-base book-base h-full">
								<img src={card.picture} alt="" />
							</picture>
							<article className="h-[104px] p-2">
								<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900">
									{card.title}
								</h3>
								<p className="line-clamp-1 text-base font-normal text-primary-200">
									{card.author}
								</p>
							</article>
						</Link>
					))}
				</FreeGlide>
			</UiSection>

			<UiSection titleChildren="免費試閱" titleLink="/cate">
				<FreeGlide className="free-glide-flex w-[1240px] flex-wrap content-start items-start gap-x-8 gap-y-4">
					{classicalCards.map((card) => (
						<Link
							href={card.link}
							key={card.id}
							className="grid h-[146px] w-[286px] grid-cols-[auto_1fr] gap-2"
						>
							<picture className="pic-base book-base h-full">
								<img src={card.picture} alt="" />
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									{card.author}
								</p>
								<p className="mt-1 line-clamp-2 w-full text-sm font-normal text-ash-600">
									{card.content}
								</p>
							</article>
						</Link>
					))}
				</FreeGlide>
			</UiSection>

			<PageNameInDev>cate</PageNameInDev>
		</section>
	);
}
