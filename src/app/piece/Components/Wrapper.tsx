"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { usePieceContext } from "@contexts/pieceContext";

import SettingBox from "./SettingBox";
import ArticleBox from "./ArticleBox";
import ChaptersList from "@/app/(main)/products/components/BoxDetail/ChaptersList";

import NavButton from "./NavButton";
import { Cross } from "@components/customUI/svg";
import { UiButton } from "@/components/customUI/client";

import { unFetchedPieceBase64 } from "@/lib/data";

import { type Chapter } from "../[...pieceSlugs]/page";

export default function Wrapper({
	pieceBase64,
	productId,
	productChapter,
	productChapters,
	publish_article,
	status_status,
}: {
	pieceBase64: string;
	productId: string;
	productChapter: Chapter;
	productChapters: Chapter[];
	publish_article: string;
	status_status: string;
}) {
	//
	const pathname = usePathname();

	const { setIsSettingBox, isPieceLoading, isCatagoryBox, setIsCatagoryBox } =
		usePieceContext();

	return (
		<>
			<aside className="sticky top-0 z-[1] block w-[60px] max-lg:w-full">
				<nav className="piece-aside m-auto mt-4 flex flex-col items-center justify-center gap-4 bg-[var(--piece-aside)] py-4 *:flex-shrink-0 max-lg:mb-[-1px] max-lg:mt-0 max-lg:flex-row max-lg:justify-start max-lg:border-b max-lg:border-[var(--piece-border)] max-lg:px-5 max-lg:py-2 lg:rounded-lg">
					<NavButton icon="detail">作品詳情</NavButton>
					<NavButton icon="warn">舉報</NavButton>
				</nav>
			</aside>

			<div className="flex w-[1080px] items-start justify-center *:shrink-0 max-xl:max-w-[calc(100%-16px-120px)] max-lg:mb-32 max-lg:w-full max-lg:max-w-none">
				{/* -- catagory -- */}
				<section
					className={
						"relative w-[1080px] ring-1 max-xl:max-w-[calc(100%-16px-120px)] " +
						" max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-0 max-lg:z-30 max-lg:w-auto max-lg:max-w-none max-lg:bg-white" +
						`${isCatagoryBox ? " block" : " hidden"}`
					}
				>
					<div className="absolute right-6 top-6 cursor-pointer *:opacity-25 hover:*:opacity-50 active:*:opacity-100 max-lg:static max-lg:flex max-lg:justify-end max-lg:pt-6 max-md:px-6">
						<button onClick={() => setIsCatagoryBox(false)}>
							<Cross></Cross>
						</button>
					</div>
					<div className="piece-cate mb-6 min-h-[calc(100vh-75px)] border border-[var(--piece-border)] bg-[var(--piece-content)] px-[60px] py-20 max-lg:mb-0 max-lg:h-[calc(100vh-44px)] max-lg:px-5 max-lg:py-6 lg:rounded-2xl">
						<div className="mb-2 flex items-center justify-between gap-4">
							<b className="title text-2xl">目錄</b>
							<div className="grow">
								<p className="title-des text-ash-600">
									{status_status === "Y" ? "已完結" : "連載中"}，共{" "}
									{productChapters.length} 章
								</p>
							</div>
							<span className="flex scale-y-[120%] cursor-pointer items-center justify-center">
								<i className="i-down-2 mr-[-5px] block leading-none text-accent-300"></i>
								<i className="i-up-2 ml-[-5px] block leading-none text-ash-600"></i>
							</span>
						</div>
						<div className="custom-scrollbar max-h-[calc(100vh-75px-120px)] overflow-y-scroll max-lg:max-h-[calc(100vh-140px)]">
							<ChaptersList
								publish_article={publish_article}
								productId={productId}
								productChapters={productChapters}
								className="ring-1 *:pr-4 *:pt-3"
							></ChaptersList>
						</div>
					</div>
				</section>

				{/* -- article -- */}
				<section
					className={
						"w-[1080px] max-xl:max-w-[calc(100%-16px-120px)] max-lg:w-full max-lg:max-w-none" +
						`${isCatagoryBox ? " lg:hidden" : " lg:block"}`
					}
				>
					<article className="piece-body mb-6 min-h-[calc(100vh-75px)] border border-[var(--piece-border)] bg-[var(--piece-content)] px-[60px] py-20 max-lg:px-5 max-lg:py-6 lg:rounded-2xl">
						<ArticleBox pieceBase64={pieceBase64 as string}></ArticleBox>
						{productChapter?.right === "N" &&
							pieceBase64 !== unFetchedPieceBase64 && (
								<div className="piece_memo relative z-[2] pb-1">
									<p className="piece_memo-gradient mb-6 mt-3 h-[0.5px]"></p>
									<div className="memo m-auto max-w-[560px] overflow-hidden rounded-xl bg-[var(--piece-content)]">
										<div className="bg-[var(--piece-content)] px-[93px] py-[76px] max-lg:px-8 max-lg:py-10 max-md:px-4 max-md:py-5">
											{/*  */}
											<p className="mb-6 font-normal">
												本作品授權出版社保留文章異動與提供閱聽的權利，作品一旦下架，您僅能繼續閱讀「已扣點」的文章，敬請理解並同意後再行扣點。
											</p>

											{/*  */}
											<div className="mb-6 flex items-center justify-between gap-12 pr-1 max-lg:gap-6 max-lg:text-sm">
												<div className="flex grow items-center justify-between">
													<p className="whitespace-nowrap">
														本<b className="opacity-0">本篇</b>篇
													</p>
													<p>
														<b className="mr-2 text-2xl text-accent-300 max-lg:text-xl">
															{productChapter.point}
														</b>
														點
													</p>
												</div>
												<UiButton
													variant="primary"
													className="h-12 max-lg:w-[90px]"
												>
													扣點閱讀
												</UiButton>
											</div>

											{/*  */}
											<div className="mb-6 flex items-center justify-between gap-12 pr-1 max-lg:gap-6 max-lg:text-sm">
												<div className="flex grow items-center justify-between">
													<p className="whitespace-nowrap">目前餘額</p>
													<p>
														<b className="mr-2 text-2xl text-accent-300 max-lg:mr-1 max-lg:text-xl">
															288358.4
														</b>
														點
													</p>
												</div>
												<UiButton
													variant="secondary"
													className="h-12 max-lg:w-[90px]"
												>
													儲值點數
												</UiButton>
											</div>

											{/*  */}
											<p className="text-center">
												<input type="checkbox" />
												<span className="ml-2">扣點不再詢問</span>
											</p>
										</div>
									</div>
								</div>
							)}
					</article>

					{productChapter?.chapter_id && (
						<section className="piece-nav m-auto flex items-center justify-between gap-11 rounded-2xl border border-[var(--piece-border)] bg-[var(--piece-nav)] px-[60px] py-5 max-lg:fixed max-lg:bottom-[60px] max-lg:left-0 max-lg:right-0 max-lg:z-[3] max-lg:rounded-none max-lg:px-5 max-lg:py-3">
							<Link
								className={
									"px-32 text-[var(--piece-text)] hover:text-white active:text-white max-xl:px-10 max-md:px-0" +
									`${pathname.substring(pathname.lastIndexOf("/") + 1) === productChapters[0].chapter_id ? " pointer-events-none opacity-40" : ""}`
								}
								href={`/piece/${productId}/${productChapters[productChapters.findIndex((v) => v.chapter_id === pathname.substring(pathname.lastIndexOf("/") + 1)) - 1]?.chapter_id}`}
							>
								上一章
							</Link>
							<p
								className={
									"flex items-center justify-center border-l border-r border-[var(--piece-border)] max-lg:px-4 max-md:text-xs " +
									" before:text-[var(--piece-text)] before:content-['點擊左右鍵_←_→_進行章節切換'] max-lg:before:content-['點擊畫面中央可展開收合工具列']"
								}
							></p>
							<Link
								className={
									"px-32 text-[var(--piece-text)] hover:text-white active:text-white max-xl:px-10 max-md:px-0" +
									`${pathname.substring(pathname.lastIndexOf("/") + 1) === productChapters[productChapters.length - 1].chapter_id ? " pointer-events-none opacity-40" : ""}`
								}
								href={`/piece/${productId}/${productChapters[productChapters.findIndex((v) => v.chapter_id === pathname.substring(pathname.lastIndexOf("/") + 1)) + 1]?.chapter_id}`}
							>
								下一章
							</Link>
						</section>
					)}
				</section>
			</div>

			<aside className="sticky top-0 block w-[60px] max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:m-auto max-lg:w-full">
				<nav className="piece-aside m-auto mt-[300px] flex flex-col items-center justify-center gap-4 rounded-lg bg-[var(--piece-aside)] py-4 *:flex-shrink-0 max-lg:mt-0 max-lg:flex-row max-lg:justify-around max-lg:rounded-none max-lg:py-2">
					<NavButton icon="cata" onClick={() => setIsCatagoryBox((v) => !v)}>
						目錄
					</NavButton>
					<NavButton icon="heart">收藏</NavButton>
					<NavButton icon="moon">夜間</NavButton>
					<NavButton icon="setting" onClick={() => setIsSettingBox(true)}>
						設定
					</NavButton>
					<div className="h-[1px] w-11 bg-ash-350 max-lg:hidden"></div>
					<button
						className={
							"flex flex-col items-center justify-center max-lg:hidden"
						}
					>
						<i className="i-arrow5-up -mt-1 block text-2xl text-primary-300"></i>
						<p className="-mt-1 mb-1 text-xs text-primary-300">TOP</p>
					</button>
				</nav>
			</aside>

			{
				<div
					className={
						"fixed bottom-0 left-0 right-0 top-0 z-10 m-auto flex items-center justify-center bg-[rgba(248,244,241,0.6)] transition-opacity duration-300" +
						`${isPieceLoading ? " pointer-events-auto opacity-100" : " pointer-events-none opacity-0"}`
					}
				>
					<p className="text-2xl">loading...</p>
				</div>
			}

			<SettingBox />
		</>
	);
}
