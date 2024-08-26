"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, ReactNode } from "react";

import TrackBtnController from "@/components/TrackBtnController";

import { type FetchedAuthorDataType } from "@/types/author";
import { type FetchedProductCardListType } from "@/types/product";
import { type FetchedAuthorsFollowers } from "@/types/fan";
import { getData, SHOW_STORE_PRODUCT_LIST } from "@/lib/api";

/**
 * writer_account 為作者 id, in order to fetch authorData
 * 如果沒有 writer_account ，代表他是大陸授權的作品。不會有 authorData
 */
export default function BoxCreator({
	authorData,
	writer_account,
	authorize,
	author,
}: {
	authorData: FetchedAuthorDataType;
	writer_account: string;
	authorize: string;
	author: string;
}) {
	//
	useEffect(() => {
		//
		if (writer_account) {
			fetchAuthorsFollowersData();
		} else {
			fetchAuthorizerProductsAmount();
		}

		//no writer_account, 取大陸授權作品數
		async function fetchAuthorizerProductsAmount() {
			try {
				const res = await getData(
					SHOW_STORE_PRODUCT_LIST +
						`?cpstring=${authorize}&page=1&amount_per_page=1`
				);
				const data = res.data as FetchedProductCardListType;
				//console.log("data: ", data);
				setAuthorizerProductsAmount(data.data_count);
			} catch (error) {
				console.error(error);
			}
		}

		//has writer_account, 取 fans 數
		async function fetchAuthorsFollowersData() {
			try {
				const res = await getData(
					`/story3/FollowControl?account=${writer_account}&type=10`
				);
				const data = res.data as FetchedAuthorsFollowers;
				//console.log("data: ", data);
				setAuthorFollowersAmount(data.follow_me_list.length);
			} catch (error) {
				console.error(error);
			}
		}
	}, []);

	//
	const [authorizerProductsAmount, setAuthorizerProductsAmount] = useState<
		null | string
	>(null);
	const [authorFollowersAmount, setAuthorFollowersAmount] = useState<number>(0);
	const [adjustFollowersAmount, setAdjustFollowersAmount] = useState<number>(0);

	//
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
		<section className="flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0)]">
			<article className="flex w-full max-w-full shrink-0 items-center justify-center gap-3 overflow-hidden p-3 max-md:px-2 xl:flex-col">
				{/* -- */}
				<Link href={`/authors/${writer_account}`}>
					<picture className="pic-base aspect-square w-[100px] shrink-0 rounded-full max-md:w-[60px]">
						<img
							src={authorData.writer_avatar || "/images/default-member.jpg"}
							alt={authorData.writer_nickname}
						/>
					</picture>
				</Link>

				{/* -- */}
				<div className="grid flex-grow grid-cols-1 gap-2 max-md:flex-grow">
					{authorData.writer_type === "C" && (
						<p className="flex items-center justify-center gap-1 max-xl:justify-start">
							<img src="/images/author_icon.png" className="block w-5" alt="" />
							<span className="text-sm text-secondary-500">簽約作家</span>
						</p>
					)}
					<h2 className="line-clamp-2 text-2xl font-normal text-ash-900 max-md:line-clamp-3 max-md:text-sm xl:text-center">
						{!writer_account ? (
							<Link
								href={`/license/${authorize}/searching`}
								className="cursor-pointer hover:text-accent-300"
							>
								{authorize}
							</Link>
						) : (
							<Link
								href={`/authors/${writer_account}`}
								className="cursor-pointer hover:text-accent-300"
							>
								{author}
							</Link>
						)}
					</h2>
				</div>

				{/* -- */}
				{!writer_account ? (
					<div className="flex flex-col items-center justify-center gap-3 max-xl:py-2 max-md:py-0">
						<div className="flex items-center justify-center gap-2">
							<p className="flex flex-col items-center justify-center gap-3 px-2">
								{authorizerProductsAmount !== null && (
									<>
										<b className="text-xl leading-none">
											{authorizerProductsAmount}
										</b>
										<span className="text-sm leading-none text-ash-600">
											作品數
										</span>
									</>
								)}
							</p>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center gap-3 max-xl:py-2 max-md:py-0">
						<div className="flex items-center justify-center gap-2">
							<p className="flex flex-col items-center justify-center gap-3 px-2">
								<b className="text-xl leading-none">
									{authorData.published_count}
								</b>
								<span className="text-sm leading-none text-ash-600">
									作品數
								</span>
							</p>
							<div className="h-[50px] w-[1px] bg-ash-500"></div>
							<p className="flex flex-col items-center justify-center gap-3 px-2">
								<b className="text-xl leading-none">
									{authorFollowersAmount + adjustFollowersAmount}
								</b>
								<span className="text-sm leading-none text-ash-600">
									追蹤數
								</span>
							</p>
						</div>
						<TrackBtnController
							writer_account={writer_account}
							callback={callbackAfterAdjustFollow}
						/>
					</div>
				)}
			</article>
		</section>
	);
}
