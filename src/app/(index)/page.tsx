import Link from "next/link";

import { Category, Categories, SortBook } from "@/types/cate";
import { PhotoSlider, NewsType } from "@/types";

import randomPicture from "@utils/randomPicture";
import randomText from "@utils/randomText";

import PhotoAndBgSlider from "./components/PhotoAndBgSlider";
import BooksGalleryA from "./components/BooksGalleryA";

import PurePhotoSlider from "@/components/slider/PurePhotoSlider";
import NewsSlider from "@/components/slider/NewsSlider";
import CategoriesList from "@/components/slider/CategoriesList";
import SortBox from "@/components/SortBox";

import { UiTitle, UiSection } from "@/components/UI";
import FreeGlide from "@/components/UI/FreeGlide";
import NestedLink from "@/components/UI/NestedLink";

import "@styles/home.scss";

const categories: Categories = [
	{
		id: "original",
		name: "琅琅原創",
		url: "/",
		isEmphasis: true,
	},
	{
		id: "romance",
		name: "言情",
		url: "/cate",
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

const backgrounds = [
	"#d9e9e8",
	"#f3e8df",
	"#E6E6FA",
	"#F5F5DC",
	"#FFF0F5",
	"#F0FFF0",
];
const photoBgSliders: (PhotoSlider & { bg?: string })[] = Array.from(
	{ length: 6 },
	(_, i) => i + 1
).map((i) => ({
	id: `${new Date().getTime() + i}`,
	link: "",
	title: randomText(3, 20),
	alt: randomText(3, 20),
	src: randomPicture(),
	bg: backgrounds[i - 1],
}));

const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

const recommendedCards = Array.from({ length: 10 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		title: randomText(3, 20),
		author: randomText(3, 20),
		authorLink: "",
		link: "",
		picture: randomPicture(),
		content: randomText(20, 100),
	})
);

const hotCards = Array.from({ length: 6 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	title: randomText(3, 20),
	author: randomText(3, 20),
	authorLink: "",
	link: "",
	picture: randomPicture(),
}));

const recommendedAuthors = Array.from({ length: 6 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		name: randomText(3, 20),
		link: "",
		picture: randomPicture(),
		content: randomText(20, 100),
	})
);

const viewedSorts: SortBook[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		title: randomText(3, 20),
		author: randomText(3, 20),
		link: "",
		picture: randomPicture(),
		amount: Math.floor(Math.random() * 10000),
	})
);

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

const newUpdatedCards = Array.from({ length: 25 }, (_, i) => i + 1).map(
	(i) => ({
		id: new Date().getTime() + i,
		title: randomText(3, 20),
		author: randomText(3, 20),
		authorLink: "",
		link: "",
		picture: randomPicture(),
		content: randomText(20, 100),
	})
);

const ads = Array.from({ length: 4 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	picture: randomPicture(),
}));

export default function Home() {
	return (
		<section>
			<section className="slider-bg-container relative mt-[calc(330px-405px+20px)] aspect-[1280/405] max-xl:mt-[calc(250px-970*405/1280*1px+20px)] max-lg:mt-[calc(191px-740*405/1280*1px+20px)] max-md:mt-0 max-md:aspect-[375/313]">
				{/* 330 | 405, 313 | 313 */}
				<PhotoAndBgSlider {...{ photoSliders: photoBgSliders }} />
			</section>

			<section className="px-6 py-5">
				<NewsSlider newsArray={newsArray} />
			</section>

			<section className="px-6 py-4">
				<CategoriesList categories={categories} />
			</section>

			<section className="bg-landscape-400 p-6 max-md:pl-5 max-md:pr-0 lg:rounded-2xl">
				<UiTitle className="mb-4">編輯推薦</UiTitle>

				<section className="grid h-[499px] grid-cols-[auto_auto] grid-rows-1 gap-x-7 gap-y-5 max-lg:h-auto max-lg:grid-cols-1 max-lg:grid-rows-[auto_auto]">
					<section className="max-md:pr-5 xl:px-8">
						{recommendedCards[0] && (
							<Link
								href={recommendedCards[0].link}
								className="block w-[220px] max-lg:grid max-lg:w-auto max-lg:grid-cols-[auto_1fr] max-lg:grid-rows-1 max-lg:gap-3"
							>
								<picture className="pic-base book-base mb-2 w-full max-lg:mb-0 max-lg:w-[140px]">
									<img src={recommendedCards[0].picture} alt="" />
								</picture>
								<article className="h-[183px] text-center max-lg:h-auto max-lg:text-left">
									<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900 max-lg:line-clamp-3 max-lg:h-[78px]">
										{recommendedCards[0].title}
									</h3>
									<p className="mb-9 line-clamp-1 text-base font-normal text-primary-200 max-lg:mb-6">
										<NestedLink
											link={recommendedCards[0].authorLink}
											className="text-inherit"
										>
											{recommendedCards[0].author}
										</NestedLink>
									</p>
									<p className="line-clamp-3 h-[62px] text-left text-sm font-normal text-ash-600">
										{recommendedCards[0].content}
									</p>
								</article>
							</Link>
						)}
					</section>

					<FreeGlide className="free-glide-flex w-[calc(286*3px+28*2px)] flex-wrap content-start items-start gap-x-7 gap-y-5 py-2 max-lg:w-auto max-lg:flex-nowrap max-md:items-center">
						{recommendedCards.slice(1).map((card) => (
							<Link
								key={card.id}
								href={card.link}
								className="grid h-[146px] w-[286px] flex-shrink-0 grid-cols-[auto_1fr] gap-2"
							>
								<picture className="pic-base book-base h-[146px]">
									<img src={card.picture} alt="" />
								</picture>
								<article className="flex h-[146px] w-full flex-col items-start justify-start gap-2">
									<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900">
										{card.title}
									</h3>
									<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
										<NestedLink link={card.authorLink} className="text-inherit">
											{card.author}
										</NestedLink>
									</p>
									<p className="line-clamp-3 h-16 text-sm font-normal text-ash-600">
										{card.content}
									</p>
								</article>
							</Link>
						))}
					</FreeGlide>
				</section>
			</section>

			<UiSection titleChildren="人氣作家" titleLink="/">
				<FreeGlide className="free-glide-flex gap-x-[30px]">
					{recommendedAuthors.map((author) => (
						<div
							className="w-[180px] px-2 pb-[1px] text-center"
							key={author.id}
						>
							<Link href={author.link} className="mb-6 block">
								<picture className="pic-base m-auto aspect-square w-[140px] rounded-full">
									<img src={author.picture} alt="" />
								</picture>
								<article className="p-2">
									<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900">
										{author.name}
									</h3>
									<p className="line-clamp-3 h-[62px] text-sm font-normal text-ash-600">
										{author.content}
									</p>
								</article>
							</Link>
							<button className="h-9 w-[100px] rounded-lg border border-accent-300 text-sm leading-8 text-accent-300">
								追蹤
							</button>
						</div>
					))}
				</FreeGlide>
			</UiSection>

			<UiSection titleChildren="近期熱門" titleLink="/cate">
				<FreeGlide className="free-glide-flex gap-x-[30px]">
					{hotCards.map((card) => (
						<Link href={card.link} key={card.id} className="w-[180px]">
							<picture className="pic-base book-base h-full">
								<img src={card.picture} alt="" />
							</picture>
							<article className="h-[104px] p-2">
								<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900">
									{card.title}
								</h3>
								<p className="line-clamp-1 text-base font-normal text-primary-200">
									<NestedLink link={card.authorLink} className="text-inherit">
										{card.author}
									</NestedLink>
								</p>
							</article>
						</Link>
					))}
				</FreeGlide>
			</UiSection>

			<section className="relative z-[2] bg-landscape-400">
				<div
					className="stretch-bg"
					style={{ "--bg": "rgb(243, 232, 223)" } as React.CSSProperties}
				></div>
				<section className="p-6">
					<UiTitle className="mb-5 justify-center">排行榜</UiTitle>
					<FreeGlide className="free-glide-flex w-[calc(286*4px+30*3px)] flex-wrap content-start items-start gap-[30px]">
						<SortBox cardSorts={viewedSorts} cardName="琅琅原創" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="言情" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="輕小說" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="玄幻" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="懸疑" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="冒險" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="靈異" cardLink="" />
						<SortBox cardSorts={viewedSorts} cardName="漫畫" cardLink="" />
					</FreeGlide>
				</section>
			</section>

			<section className="h-[330px] overflow-hidden max-xl:h-[calc(var(--container-width)*33/128)] max-md:aspect-[375/313] max-md:h-auto md:mt-5">
				{/* 330 | 405 */}
				<PurePhotoSlider {...{ photoSliders }} />
			</section>

			{/* --- */}
			<UiSection titleChildren="AD" titleLink="/cate">
				<FreeGlide className="free-glide-flex gap-7">
					{ads.map((ad) => (
						<div key={ad.id} className="h-[237px] w-[286px]">
							<picture className="pic-base h-[237px] w-[286px]">
								<img src={ad.picture} alt="" />
							</picture>
						</div>
					))}
				</FreeGlide>
			</UiSection>

			{/* --- */}
			<BooksGalleryA></BooksGalleryA>

			<UiSection titleChildren="熱門分類小說" titleLink="/cate">
				<div className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-5 max-lg:grid-cols-1 max-lg:grid-rows-[auto_auto]">
					<div className="w-[calc(220px+64px)] px-8 max-xl:w-[220px] max-xl:px-0 max-lg:w-auto">
						<Link
							href={newUpdatedCards[0].link}
							className="w-[220px] max-lg:grid max-lg:w-auto max-lg:grid-cols-[auto_1fr] max-lg:grid-rows-1 max-lg:gap-3"
						>
							<picture className="pic-base book-base mb-2 w-full max-lg:mb-0 max-lg:w-[140px]">
								<img src={newUpdatedCards[0].picture} alt="" />
							</picture>
							<article className="mb-6 h-[183px] text-center max-lg:mb-0 max-lg:h-auto max-lg:text-left">
								<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900">
									{newUpdatedCards[0].title}
								</h3>
								<p className="mb-9 line-clamp-1 text-base font-normal text-primary-200">
									<NestedLink
										link={newUpdatedCards[0].authorLink}
										className="text-inherit"
									>
										{newUpdatedCards[0].author}
									</NestedLink>
								</p>
								<p className="line-clamp-3 h-[62px] text-left text-sm font-normal text-ash-600">
									{newUpdatedCards[0].content}
								</p>
							</article>
							<button className="m-auto block h-10 w-[100px] rounded-lg bg-accent-300 text-center leading-10 text-white max-lg:hidden">
								書籍詳情
							</button>
						</Link>
					</div>
					<FreeGlide className="free-glide-flex">
						<div className="max-md_max-children-9 grid grid-cols-3 gap-x-7 gap-y-4 ring-1 max-md:grid-cols-1">
							{newUpdatedCards.slice(1).map((card, i) => (
								<div
									key={card.id}
									className={
										"grid w-[calc(220px+64px+2px)] grid-cols-[auto_1fr] gap-[2px] max-md:w-[calc(100vw-24px)]"
									}
								>
									<b className="flex h-6 w-5 items-center justify-center">⦁</b>
									<article className="flex h-full w-full flex-col items-start justify-start gap-1">
										<Link
											className="line-clamp-1 w-full text-lg font-normal text-ash-900"
											href={card.link}
										>
											{/* {i + 1} */}
											{card.title}
										</Link>
										<Link
											className="line-clamp-1 w-full text-base font-normal text-primary-200"
											href={card.authorLink}
										>
											{card.author}
										</Link>
									</article>
								</div>
							))}
						</div>
					</FreeGlide>
				</div>
			</UiSection>

			<UiSection titleChildren="輕小說推薦" titleLink="/cate">
				<FreeGlide className="free-glide-flex w-[1240px] flex-wrap content-start items-start gap-x-8 gap-y-4">
					{novelCards.map((card) => (
						<div className="relative h-[146px] w-[286px]" key={card.id}>
							<Link
								href={card.link}
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
									{/* <p className="mt-1 line-clamp-2 w-full text-sm font-normal text-ash-600">
									{card.content}
								</p> */}
								</article>
							</Link>
							<Link
								href={card.typeLink}
								className="absolute bottom-0 left-[114px] flex h-6 w-[75px] items-center justify-center rounded bg-[rgb(235,235,235)] text-sm font-normal text-ash-600"
							>
								{card.type}
							</Link>
						</div>
					))}
				</FreeGlide>
			</UiSection>
		</section>
	);
}
