import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import {
	fetchDataWithCookieInServer,
	STORY_DOMAIN,
	SHOW_STORE_PRODUCT,
} from "@/lib/api";
import { convertCookieObjArrayToString } from "@/lib/helper";

import { type NewsType } from "@/types";
import {
	type FetchedProductDataType,
	type CategoryType,
} from "@/types/product";
import { type Chapter, type ProductChaptersData } from "@/types/chapter";
import { type FetchedAuthorDataType } from "@/types/author";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";
import randomInt from "@tools/randomInt";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle } from "@/components/customUI";
import { UiButton, UiTag } from "@/components/customUI/client";
import NestedLink from "@/components/customUI/NestedLink";

import BoxRecommendation from "../components/BoxRecommendation";
import BoxCreator from "../components/BoxCreator";
import BoxOverview from "../components/BoxOverview";
import BoxDetail from "../components/BoxDetail";

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

//
export type MessageType = {
	id: number;
	name: string;
	context: string;
	time: Date;
};
export type CommentType = MessageType & {
	likesNumber: number;
	feedbacks: MessageType[];
};
export type DetailType = {
	summary: string;
	chapter: { id: number; title: string }[];
	comment: CommentType[];
};

let detail: DetailType = {
	//
	summary: randomText(800, 1200),

	chapter: Array.from({ length: 106 }, (_, i) => i + 1).map((i) => ({
		id: new Date().getTime() + i,
		title: randomText(3, 20),
	})),

	comment: Array.from({ length: 26 }, (_, i) => i + 1).map((i) => ({
		id: new Date().getTime() + i,
		name: randomText(3, 20),
		context: randomText(20, 100),
		time: new Date(),
		likesNumber: Math.floor(Math.random() * 30),
		feedbacks: Array.from({ length: randomInt(0, 5) }, (_, i) => i + 1).map(
			(i) => ({
				id: new Date().getTime() + i,
				name: randomText(3, 20),
				context: randomText(20, 100),
				time: new Date(),
			})
		),
	})),
};

export default async function Page({
	params: { pid },
}: {
	params: { pid: string };
}) {
	//
	const cookieStore = cookies();
	let um2 = cookieStore.get("um2");

	if (um2) um2 = { ...um2, value: encodeURIComponent(um2.value) };

	const cookieString = convertCookieObjArrayToString([um2]);

	//
	var productData: null | FetchedProductDataType = null;
	try {
		productData = (await fetchDataWithCookieInServer(
			STORY_DOMAIN + SHOW_STORE_PRODUCT + `?id=${pid}`,
			cookieString
		)) as FetchedProductDataType;
		if (!productData)
			throw new Error("fetch productDataerror in products page");
	} catch (error) {
		console.log("error \n", error);
	}
	console.log("productData; \n", productData);

	//
	var productChaptersData: null | ProductChaptersData = null;
	try {
		productChaptersData = await fetchDataWithCookieInServer(
			STORY_DOMAIN +
				`/story3/ShowStoreProductChapter?id=${pid}&order_by=chapter&amount_per_page=50&page=1`,
			""
		);
		if (!productChaptersData)
			throw new Error("fetch productChaptersData error in products page");
	} catch (error) {
		console.log("error \n", error);
	}
	//console.log("productChaptersData: \n", productChaptersData);

	if (
		!productData ||
		!productChaptersData ||
		productData.status !== "200" ||
		productChaptersData.status !== "200"
	) {
		notFound();
	}

	//
	var authorData: null | FetchedAuthorDataType = null;
	try {
		authorData = (await fetchDataWithCookieInServer(
			STORY_DOMAIN +
				`/story3/AccountData?account=${productData.writer_account}&action=select`,
			""
		)) as FetchedAuthorDataType;
		if (!authorData) throw new Error("fetch authorData error in author page");
	} catch (error) {
		console.log("error \n", error);
	}
	//console.log("authorData; \n", authorData);

	if (!authorData || authorData.status !== "200") {
		notFound();
	}

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
					<BoxOverview productData={productData}></BoxOverview>
				</div>

				{/* right_top */}
				<div className="col-start-2 row-start-1 aspect-[310/407] w-[310px] rounded-2xl bg-landscape-400 p-3 max-xl:col-span-2 max-xl:col-start-1 max-xl:row-start-2 max-xl:aspect-auto max-xl:min-h-6 max-xl:w-auto max-md:rounded-none">
					<BoxCreator
						authorData={authorData}
						authorize={productData.authorize}
						author={productData.author}
						writer_account={productData.writer_account}
					></BoxCreator>
				</div>

				{/* left_bottom */}
				<div className="col-start-1 row-start-2 max-xl:row-start-3">
					<BoxDetail
						detail={detail}
						publish_article={productData.publish_article}
						summary={productData.summary}
						productId={pid}
						productChapters={productChaptersData.list}
						title={productData.title}
					></BoxDetail>
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
