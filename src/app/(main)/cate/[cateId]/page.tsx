import Link from "next/link";
import { redirect, notFound } from "next/navigation";

import { SortBook } from "@/types/cate";
import { type PhotoSlider, type NewsType } from "@/types";
import {
	type CateData,
	type FetchedCateData,
	type FetchedUiDivisionListType,
	type UiDivision,
} from "@/types/cate";
import { type ProductCardViaCategoryType } from "@/types/product";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import {
	fetchDataWithCookieInServer,
	STORY_DOMAIN,
	SHOW_CATEGORY,
	SHOW_CATEGORY_DIVISIONS,
} from "@/lib/api";

import { imgClassNameInGroupHover } from "@lib/data"; //categoryDatas,

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
import UiDivision2 from "../components/UiDivision2";
import UiDivision3 from "../components/UiDivision3";
import UiDivision5 from "../components/UiDivision5";
import UiDivision6 from "../components/UiDivision6";

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

function splitArray<T>(array: T[]): [T[], T[]] {
	const midIndex = Math.floor(array.length / 2);
	const firstHalf = array.slice(0, midIndex);
	const secondHalf = array.slice(midIndex);
	return [firstHalf, secondHalf];
}

export default async function Page({ params }: { params: { cateId: string } }) {
	//
	const { cateId } = params;

	////
	//
	const fetchedCategoryData = await fetchDataWithCookieInServer(
		STORY_DOMAIN + SHOW_CATEGORY + "?store=Y",
		""
	);

	if (!fetchedCategoryData || !fetchedCategoryData.list) notFound();

	const categoryDatas = fetchedCategoryData.list as CateData[];
	console.log(" categoryDatas", categoryDatas);

	const categoryData = categoryDatas.find((el) => el.id === cateId);
	if (!categoryData) notFound();

	////
	//https://story-onlinelab.udn.com/story3/IndexDiv?div_type=M&contenttype=1
	//
	const fetchedDivisionList = await fetchDataWithCookieInServer(
		STORY_DOMAIN +
			SHOW_CATEGORY_DIVISIONS +
			`?div_type=M&contenttype=${cateId}`,
		""
	);

	if (!fetchedDivisionList || !fetchedDivisionList.list) notFound();

	const divisionList = fetchedDivisionList.list as UiDivision[];
	console.log(" divisionList", divisionList);

	const uiDivisions = divisionList.sort(
		(a, b) => Number(b.div_weight) - Number(a.div_weight)
	);

	const [firstUiDivisionsHalf, secondUiDivisionsHalf] =
		splitArray<UiDivision>(uiDivisions);

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
				<CategoriesList categoryDatas={categoryDatas} />
			</section>

			<>
				{firstUiDivisionsHalf.map((uiDivision) =>
					uiDivision.div_ui_type === "1" ? (
						<section key={uiDivision.div_id}>
							<section className="mb-2 px-6">
								<UiTitle>{categoryData.name}</UiTitle>
							</section>

							<section className="bg-landscape-400 lg:rounded-2xl">
								<HeroSection uiDivision={uiDivision} />
							</section>
						</section>
					) : uiDivision.div_ui_type === "2" ? (
						<UiDivision2 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "3" ? (
						<UiDivision3 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "4" ? (
						<UiDivision3 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "5" ? (
						<UiDivision5 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "6" ? (
						<UiDivision6 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : null
				)}
			</>

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

			{/* --- */}
			<>
				{secondUiDivisionsHalf.map((uiDivision) =>
					uiDivision.div_ui_type === "1" ? (
						<section key={uiDivision.div_id}>
							<section className="mb-2 px-6">
								<UiTitle>{categoryData.name}</UiTitle>
							</section>

							<section className="bg-landscape-400 lg:rounded-2xl">
								<HeroSection uiDivision={uiDivision} />
							</section>
						</section>
					) : uiDivision.div_ui_type === "2" ? (
						<UiDivision2 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "3" ? (
						<UiDivision3 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "4" ? (
						<UiDivision3 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "5" ? (
						<UiDivision5 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : uiDivision.div_ui_type === "6" ? (
						<UiDivision6 uiDivision={uiDivision} key={uiDivision.div_id} />
					) : null
				)}
			</>

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
