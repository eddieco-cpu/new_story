import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { fetchDataWithCookieInServer } from "@/lib/api";
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

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { UiTitle } from "@/components/customUI";
import { UiButton, UiTag } from "@/components/customUI/client";
import NestedLink from "@/components/customUI/NestedLink";
import ArticleExpansion from "../components/ArticleExpansion";

import { formatTimestampToDateString } from "@/lib/helper";

//
/**
 * {
  reader_avatar: 'https://story.udn.com/dcstore/img/default-member.jpg',
  agree_s_term_ver: '1',
  reader_nickname: '含覓',
  reader_description: '',
  status: '200',
  writer_type: 'N',
  writer_nickname: '含覓',
  agree_gt_term_ver: '0',
  message: '',
  agree_w_term_ver: '1',
  writer_description: '寫寫小說，編編劇本，偏好日本文學細水長流型的寫作風格。',
  is_stop: 'N',
  published_count: '2',
  writer_avatar: 'https://story.udn.com/dcstore/accountsdata/16908_writer_avatar.jpg'
}
 */

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
	const um2 = cookieStore.get("um2");

	const cookieString = convertCookieObjArrayToString([um2]);

	//
	var authorData: null | FetchedAuthorDataType = null;
	try {
		authorData = (await fetchDataWithCookieInServer(
			`https://story-onlinelab.udn.com/story3/AccountData?account=${authorId}&action=select`,
			cookieString
		)) as FetchedAuthorDataType;
		if (!authorData) throw new Error("fetch authorData error in author page");
	} catch (error) {
		console.log("error \n", error);
	}
	console.log("authorData; \n", authorData);

	//
	var authorPiecesData: null | FetchedAuthorPiecesData = null;
	try {
		authorPiecesData = (await fetchDataWithCookieInServer(
			`https://story-onlinelab.udn.com/story3/AccountData?account=${authorId}&action=select_publish`,
			cookieString
		)) as FetchedAuthorPiecesData;
		if (!authorPiecesData)
			throw new Error("fetch authorPiecesData error in author page");
	} catch (error) {
		console.log("error \n", error);
	}
	//console.log("authorPiecesData; \n", authorPiecesData);

	//
	var authorFollowersData: null | FetchedAuthorsFollowers = null;
	try {
		authorFollowersData = (await fetchDataWithCookieInServer(
			`https://story-onlinelab.udn.com/story3/FollowControl?account=${authorId}&type=10`,
			""
		)) as FetchedAuthorsFollowers;

		if (!authorFollowersData)
			throw new Error("fetch authorFollowersData error in author page");
		//
	} catch (error) {
		console.log("error \n", error);
	}

	if (
		!authorData ||
		!authorPiecesData ||
		authorData.status !== "200" ||
		authorPiecesData.status !== "200" ||
		!authorFollowersData ||
		authorFollowersData.status !== "200"
	) {
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
			<section className="mb-5 rounded-2xl bg-landscape-400 px-32 py-12 max-lg:px-5 max-lg:py-6">
				{/* -- */}
				<div className="flex items-center justify-start gap-4">
					<picture className="pic-base aspect-square w-[120px] shrink-0 rounded-full">
						<img
							src={authorData.writer_avatar}
							alt={authorData.writer_nickname}
						/>
					</picture>
					<article className="flex flex-col items-start justify-start gap-2">
						{/* <p className="flex items-center justify-start gap-1">
							<img src="/images/author_icon.png" className="block w-5" alt="" />
							<span className="text-sm text-secondary-500">簽約作家</span>
						</p> */}
						<div className="max-lg: flex items-center justify-start gap-4 max-lg:flex-col max-md:gap-2">
							<h2 className="line-clamp-1 text-2xl font-normal text-ash-900 max-md:line-clamp-2 max-md:h-16">
								{authorData.writer_nickname}
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
							<b className="text-lg leading-none">
								{authorData.published_count}
							</b>
						</p>
						<div className="h-[22px] w-[1px] bg-ash-500"></div>
						<p className="flex items-end justify-center gap-2 px-2">
							<span className="text-sm leading-none text-ash-600">追蹤數</span>
							<b className="text-lg leading-none">
								{authorFollowersData.follow_me_list.length}
							</b>
						</p>
					</div>
				</div>

				{/* -- */}
				<ArticleExpansion
					article={authorData.writer_description}
				></ArticleExpansion>
			</section>
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
									<UiButton
										variant="secondary"
										className="flex h-[34px] items-center justify-center gap-2 max-md:h-8 max-md:w-[90px] max-md:gap-1 max-md:rounded-md max-md:text-sm"
									>
										<i className="i-heart-empty text-inherit"></i>
										<span className="text-inherit">收藏</span>
									</UiButton>
									<UiButton
										variant="primary"
										className="relative h-[34px] max-md:h-8 max-md:w-[90px] max-md:text-sm"
									>
										<NestedLink
											className="absolute bottom-0 left-0 right-0 top-0 block pt-[1px] text-inherit"
											link={`/piece/${card.id}/${card.last_update_chapter_id}`}
										>
											開始閱讀
										</NestedLink>
									</UiButton>
								</div>
							</li>
						))}
				</ul>
			</section>
		</section>
	);
}
