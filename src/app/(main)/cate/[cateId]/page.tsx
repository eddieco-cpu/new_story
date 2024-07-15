import Link from "next/link";
import { redirect } from "next/navigation";

import { SortBook } from "@/types/cate";
import { PhotoSlider, NewsType } from "@/types";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import { categoryDatas, imgClassNameInGroupHover } from "@lib/data";

import PurePhotoSlider from "@/components/slider/PurePhotoSlider";
import NewsSlider from "@/components/slider/NewsSlider";
import CategoriesList from "@/components/slider/CategoriesList";

import HeroSection from "../components/HeroSection";

import SortBox from "@/components/SortBox";

import { UiTitle, UiSection } from "@/components/customUI";
import FreeGlide from "@/components/customUI/FreeGlide";
import NestedLink from "@/components/customUI/NestedLink";

import PageNameInDev from "@/components/customUI/PageNameInDev";

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

const ads = Array.from({ length: 4 }, (_, i) => i + 1).map((i) => ({
	id: new Date().getTime() + i,
	picture: randomPicture(),
}));

export default function Page({ params }: { params: { cateId: string } }) {
	//
	const { cateId } = params;

	const categoryData = categoryDatas.find((el) => el.id === cateId);

	if (!categoryData) redirect("/404");

	return (
		<section>
			<section className="h-[330px] overflow-hidden max-xl:h-[calc(var(--container-width)*33/128)] max-md:aspect-[375/313] max-md:h-auto md:mt-5">
				{/* 330 | 405 */}
				<PurePhotoSlider {...{ photoSliders }} />
			</section>

			<section className="px-6 py-5">
				<NewsSlider newsArray={newsArray} />
			</section>

			<section className="px-6 py-4 max-md:hidden">
				<CategoriesList />
			</section>

			<section>
				<section className="mb-2 px-6">
					<UiTitle>{categoryData.name}</UiTitle>
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
							className="group grid h-[146px] w-[286px] grid-cols-[auto_1fr] gap-2"
						>
							<picture className="pic-base book-base h-full">
								<img
									src={card.picture}
									alt=""
									className={imgClassNameInGroupHover}
								/>
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									<NestedLink
										link="https://www.youtube.com/?app=desktop&hl=zh-tw"
										className="text-inherit hover:text-accent-250 active:text-accent-220"
									>
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
						<Link href={card.link} key={card.id} className="group w-[180px]">
							<picture className="pic-base book-base h-full">
								<img
									src={card.picture}
									className={imgClassNameInGroupHover}
									alt=""
								/>
							</picture>
							<article className="h-[104px] p-2">
								<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
									{card.title}
								</h3>
								<p className="line-clamp-1 text-base font-normal text-primary-200">
									<NestedLink
										link={"/"}
										className="text-inherit hover:text-accent-250 active:text-accent-220"
									>
										{card.author}
									</NestedLink>
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
							<Link
								href={card.link}
								className="group w-[220px] max-md:w-[180px]"
							>
								<picture className="pic-base book-base mb-2 w-full">
									<img
										src={card.picture}
										alt=""
										className={imgClassNameInGroupHover}
									/>
								</picture>
								<article className="h-[183px] text-center">
									<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
										{card.title}
									</h3>
									<p className="mb-9 line-clamp-1 text-base font-normal text-primary-200">
										<NestedLink
											link={card.authorLink}
											className="text-inherit hover:text-accent-250 active:text-accent-220"
										>
											{card.author}
										</NestedLink>
									</p>
									<p className="line-clamp-3 h-[62px] text-left text-sm font-normal text-ash-600">
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
					<UiTitle className="mb-5 justify-center">
						{categoryData.name}排行
					</UiTitle>
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
							className="group grid h-[146px] w-[286px] grid-cols-[auto_1fr] gap-2"
						>
							<picture className="pic-base book-base h-full">
								<img
									src={card.picture}
									alt=""
									className={imgClassNameInGroupHover}
								/>
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									<NestedLink
										link={""}
										className="text-inherit hover:text-accent-250 active:text-accent-220"
									>
										{card.author}
									</NestedLink>
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
						<Link href={card.link} key={card.id} className="group w-[180px]">
							<picture className="pic-base book-base h-full">
								<img
									src={card.picture}
									alt=""
									className={imgClassNameInGroupHover}
								/>
							</picture>
							<article className="h-[104px] p-2">
								<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
									{card.title}
								</h3>
								<p className="line-clamp-1 text-base font-normal text-primary-200">
									<NestedLink
										link=""
										className="text-inherit hover:text-accent-250 active:text-accent-220"
									>
										{card.author}
									</NestedLink>
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
							className="group grid h-[146px] w-[286px] grid-cols-[auto_1fr] gap-2"
						>
							<picture className="pic-base book-base h-full">
								<img
									src={card.picture}
									alt=""
									className={imgClassNameInGroupHover}
								/>
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									<NestedLink
										link={""}
										className="text-inherit hover:text-accent-250 active:text-accent-220"
									>
										{card.author}
									</NestedLink>
								</p>
								<p className="mt-1 line-clamp-2 w-full text-sm font-normal text-ash-600">
									{card.content}
								</p>
							</article>
						</Link>
					))}
				</FreeGlide>
			</UiSection>

			{/* --- */}
			<UiSection
				titleChildren={<span className="text-transparent">AD</span>}
				titleLink="/cate"
			>
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

			<PageNameInDev>cate</PageNameInDev>
		</section>
	);
}
