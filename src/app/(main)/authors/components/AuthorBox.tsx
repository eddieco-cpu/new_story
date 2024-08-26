"use client";

import TrackBtnController from "@/components/TrackBtnController";
import ArticleExpansion from "../components/ArticleExpansion";

import React, { useState, useEffect } from "react";

import { type FetchedAuthorDataType } from "@/types/author";
import { type Fan, type FetchedAuthorsFollowers } from "@/types/fan";

import { getData, FOLLOW_CONTROL } from "@/lib/api";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

export default function AuthorBox({
	authorData,
	authorId,
}: {
	authorData: FetchedAuthorDataType;
	authorId: string;
}) {
	//
	const [authorFollowersData, setAuthorFollowersData] = useState<{
		follow_me_list: Fan[];
	}>({
		follow_me_list: [],
	});

	const [adjustFollowersAmount, setAdjustFollowersAmount] = useState<number>(0);

	//
	useEffect(() => {
		fetchAuthorsFollowersData();
	}, []);

	//
	async function fetchAuthorsFollowersData() {
		try {
			const res = await getData(
				BASE_PATH + FOLLOW_CONTROL + `?account=${authorId}&type=10`
			);

			if (res.data.status !== "200" && !res.data.follow_me_list) {
				throw new Error("fetchAuthorsFollowersData error");
			}

			const data = res.data as FetchedAuthorsFollowers;
			console.log("data: ", data);

			const follow_me_list = data.follow_me_list;
			setAuthorFollowersData(() => ({ follow_me_list }));
		} catch (error) {
			console.error(error);
		}
	}

	function callbackAfterAdjustFollow(v: "add" | "remove") {
		//alert("callbackTest " + v);
		if (v === "add") {
			setAdjustFollowersAmount((prev) => prev + 1);
		}
		if (v === "remove") {
			setAdjustFollowersAmount((prev) => prev - 1);
		}
	}

	//
	return (
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
					{authorData.writer_type === "C" && (
						<p className="flex items-center justify-start gap-1">
							<img
								src={BASE_PATH + "/images/author_icon.png"}
								className="block w-5"
								alt=""
							/>
							<span className="text-sm text-secondary-500">簽約作家</span>
						</p>
					)}
					<div className="max-lg: flex items-center justify-start gap-4 max-lg:flex-col max-md:gap-2">
						<h2 className="line-clamp-1 text-2xl font-normal text-ash-900 max-md:line-clamp-2 max-md:h-16">
							{authorData.writer_nickname}
						</h2>
						<TrackBtnController
							writer_account={authorId}
							className="w-28"
							callback={callbackAfterAdjustFollow}
						/>
					</div>
				</article>
			</div>

			{/* -- */}
			<div className="mb-6 pl-[calc(120px+8px)] max-lg:mt-6 max-md:flex max-md:items-center max-md:justify-center max-md:pl-0">
				<div className="flex items-center justify-start">
					<p className="flex items-end justify-center gap-2 px-2">
						<span className="text-sm leading-none text-ash-600">作品數</span>
						<b className="text-lg leading-none">{authorData.published_count}</b>
					</p>
					<div className="h-[22px] w-[1px] bg-ash-500"></div>
					<p className="flex items-end justify-center gap-2 px-2">
						<span className="text-sm leading-none text-ash-600">追蹤數</span>
						<b className="text-lg leading-none">
							{authorFollowersData.follow_me_list.length +
								adjustFollowersAmount}
						</b>
					</p>
				</div>
			</div>

			{/* -- */}
			<ArticleExpansion
				article={authorData.writer_description}
			></ArticleExpansion>
		</section>
	);
}
