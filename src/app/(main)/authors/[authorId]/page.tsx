import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import {
	fetchDataWithCookieInServer,
	STORY_DOMAIN,
	ACCOUNT_DATA,
} from "@/lib/api";
import { convertCookieObjArrayToString } from "@/lib/helper";

import { type NewsType } from "@/types";
import {
	type FetchedAuthorDataType,
	type FetchedAuthorPiecesData,
} from "@/types/author";
import { type ProductCardViaAuthorType } from "@/types/product";
import { type Fan, type FetchedAuthorsFollowers } from "@/types/fan";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import AuthorBox from "../components/AuthorBox";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";

import { UiButton, UiTag } from "@/components/customUI/client";
import NestedLink from "@/components/customUI/NestedLink";

import CollectBtnController from "@/components/CollectBtnController";
import StartReadBtnController from "@/components/StartReadBtnController";

import { formatTimestampToDateString } from "@/lib/helper";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

export default async function Page({
	params: { authorId },
}: {
	params: { authorId: string };
}) {
	//
	const cookieStore = cookies();
	let um2 = cookieStore.get("um2");

	if (um2) um2 = { ...um2, value: encodeURIComponent(um2.value) };

	const cookieString = convertCookieObjArrayToString([um2]);

	//
	var authorData: null | FetchedAuthorDataType = null;
	try {
		authorData = (await fetchDataWithCookieInServer(
			STORY_DOMAIN + ACCOUNT_DATA + `?account=${authorId}&action=select`,
			cookieString
		)) as FetchedAuthorDataType;
		if (!authorData) throw new Error("fetch authorData error in author page");
	} catch (error) {
		console.log("error \n", error);
	}
	//console.log("authorData; \n", authorData);

	//
	var authorPiecesData: null | FetchedAuthorPiecesData = null;
	try {
		authorPiecesData = (await fetchDataWithCookieInServer(
			STORY_DOMAIN +
				ACCOUNT_DATA +
				`?account=${authorId}&action=select_publish`,
			""
		)) as FetchedAuthorPiecesData;
		if (!authorPiecesData)
			throw new Error("fetch authorPiecesData error in author page");
	} catch (error) {
		console.log("error \n", error);
	}
	console.log("authorPiecesData; \n", authorPiecesData);

	if (
		!authorData ||
		!authorPiecesData ||
		authorData.status !== "200" ||
		authorPiecesData.status !== "200"
	) {
		notFound();
	}

	return (
		<section>
			{/* - */}
			<section className="py-5 max-md:px-5">
				<NewsSlider newsArray={newsArray} />
			</section>

			{/* - */}
			<section className="pb-5 max-md:hidden">
				<Breadcrumb />
			</section>

			{/* - */}
			<AuthorBox {...{ authorData, authorId }}></AuthorBox>

			{/* - */}
			<section className="mb-16 px-6 max-md:px-0">
				{/* -- */}
				<div className="border-b border-landscape-400 px-6">
					<p className="inline-flex items-end justify-center gap-1 border-b-2 border-accent-300 px-6 py-4">
						<b className="text-lg font-bold text-accent-300">作品</b>
						<span className="text-sm text-ash-850">
							({authorData.published_count})
						</span>
					</p>
				</div>

				{/* -- */}
				<ul className="m-auto grid grid-cols-2 gap-x-[30px] gap-y-10 pb-8 pt-4 max-xl:grid-cols-1 max-md:gap-y-7 max-md:px-5">
					{authorPiecesData.list.length > 0 &&
						authorPiecesData.list.map((card) => (
							<li
								className="group relative h-[205px] max-md:h-[162px]"
								key={card.id}
							>
								<Link
									href={`/products/${card.id}`}
									className="grid h-full grid-cols-[auto_1fr] gap-2 transition-all duration-500 hover:translate-y-[-5px]"
								>
									<picture className="pic-base book-base h-full">
										<img
											src={card.imgcover}
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
												{card.status_status === "Y" ? "已完結" : "連載中"}
											</UiTag>
											{card.category.map((tag, i) => (
												<UiTag
													el="nestedLink"
													link={`/cate/${tag.id}`}
													className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
													key={tag.id + i}
												>
													{tag.name}
												</UiTag>
											))}
										</div>
										<div>
											<p className="line-clamp-1 w-full text-sm font-normal text-primary-200">
												<span className="text-inherit">{card.author}</span>
											</p>
										</div>
										<div>
											<p className="line-clamp-1 w-full text-sm font-normal text-primary-200">
												<span className="text-ash-600">更新至</span>{" "}
												<NestedLink
													className="text-inherit"
													link={`/piece/${card.id}/${card.last_update_chapter_id}`}
												>
													{card.last_update_chapter_name}
												</NestedLink>
											</p>
										</div>
										<p className="line-clamp-1 w-full text-sm font-normal text-ash-600">
											<time className="text-ash-600">
												{formatTimestampToDateString(
													card.last_update_chapter_publishtime
												)}
											</time>
										</p>
									</article>
								</Link>
								<div className="absolute bottom-0 right-0 flex items-center justify-center gap-4 max-md:gap-3">
									{/* <UiButton
										variant="secondary"
										className="flex h-[34px] items-center justify-center gap-2 max-md:h-8 max-md:w-[90px] max-md:gap-1 max-md:rounded-md max-md:text-sm"
									>
										<i className="i-heart-empty text-inherit"></i>
										<span className="text-inherit">收藏</span>
									</UiButton> */}
									<CollectBtnController
										is_collection={"N"}
										id={card.id}
										className="h-[34px] max-md:h-8 max-md:w-[90px] max-md:gap-1"
										isInNav={false}
									/>

									<StartReadBtnController
										id={card.id}
										className="h-[34px] max-md:h-8 max-md:w-[90px] max-md:text-sm"
									/>
								</div>
							</li>
						))}
				</ul>
			</section>
		</section>
	);
}
