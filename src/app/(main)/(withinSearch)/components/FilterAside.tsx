"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useSearchContext } from "@contexts/searchContext";

import { type CateData, type FetchedCateData } from "@/types/cate";

import NestedLink from "@/components/customUI/NestedLink";

//
const filterWordCounts = [
	{
		id: "words-all",
		title: "全部",
		paramKey: "words",
		paramVal: "",
	},
	{
		id: "words-1",
		title: "1萬以下",
		paramKey: "words",
		paramVal: "1",
	},
	{
		id: "words-2",
		title: "1萬~3萬",
		paramKey: "words",
		paramVal: "2",
	},
	{
		id: "words-3",
		title: "3萬~5萬",
		paramKey: "words",
		paramVal: "3",
	},
	{
		id: "words-4",
		title: "5萬~10萬",
		paramKey: "words",
		paramVal: "4",
	},
	{
		id: "words-5",
		title: "10萬以上",
		paramKey: "words",
		paramVal: "5",
	},
];

const filterStatus = [
	{
		id: "complete-all",
		title: "全部",
		paramKey: "complete",
		paramVal: "",
	},
	{
		id: "complete-1",
		title: "連載中",
		paramKey: "complete",
		paramVal: "1",
	},
	{
		id: "complete-2",
		title: "已完結",
		paramKey: "complete",
		paramVal: "2",
	},
];

const filterTimeAreas = [
	{
		id: "update_time-all",
		title: "全部",
		paramKey: "update_time",
		paramVal: "",
	},
	{
		id: "update_time-1",
		title: "3日內",
		paramKey: "update_time",
		paramVal: "1",
	},
	{
		id: "update_time-2",
		title: "7日內",
		paramKey: "update_time",
		paramVal: "2",
	},
	{
		id: "update_time-3",
		title: "半月內",
		paramKey: "update_time",
		paramVal: "3",
	},
	{
		id: "update_time-4",
		title: "一月內",
		paramKey: "update_time",
		paramVal: "4",
	},
];

function FilterCate({ categoryDatas }: { categoryDatas: CateData[] }) {
	const {
		isMoblieShowFilterCate,
		setIsMoblieShowFilterCate,
		createQueryString,
	} = useSearchContext();

	const pathname = usePathname();
	const searchParams = useSearchParams();

	const category = searchParams?.get("category") || "";

	return (
		<section
			className={
				"flex flex-col items-stretch justify-start gap-4 " +
				` max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 max-md:z-30 max-md:bg-[rgba(0,0,0,0.7)]` +
				` transition-opacity duration-200` +
				` ${isMoblieShowFilterCate ? " max-md:scale-x-100 max-md:opacity-100" : " max-md:scale-x-0 max-md:opacity-0"} `
			}
			style={{
				transition: isMoblieShowFilterCate
					? ""
					: " transform 0s ease 0.6s, opacity 0.2s ease 0.4s",
			}}
			onClick={() => setIsMoblieShowFilterCate(false)}
		>
			<p className="rounded-md bg-landscape-450 px-[10px] py-[5px] max-md:hidden">
				分類
			</p>
			<nav
				className={
					"flex flex-wrap content-start justify-start gap-2 " +
					` max-md:absolute max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 max-md:m-auto max-md:h-fit max-md:w-[calc(100%-40px)] max-md:flex-col max-md:content-center max-md:items-center max-md:justify-center max-md:gap-4 max-md:rounded-lg max-md:bg-white max-md:p-5` +
					` duration-400 max-md:transition-opacity` +
					` ${isMoblieShowFilterCate ? " delay-300 max-md:opacity-100" : " max-md:opacity-0"} `
				}
			>
				{[{ name: "全部", id: "" }, ...categoryDatas].map((cate, i) => (
					<Link
						key={cate.id + i}
						href={pathname + "?" + createQueryString("category", cate.id)}
						className={
							"inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300 " +
							` max-md:justify-center max-md:border-0 max-md:border-transparent max-md:py-1` +
							` ${category === cate.id ? " !border-accent-300 !text-accent-300 *:text-accent-300" : ""} `
						}
					>
						<span className="max-md:text-base max-md:font-medium">
							{cate.name}
						</span>
						{category === cate.id && category !== "" && (
							<NestedLink
								link={pathname + "?" + createQueryString("category", "")}
								className="max-md:hidden"
							>
								✕
							</NestedLink>
						)}
					</Link>
				))}
			</nav>
		</section>
	);
}

function FilterDetailsCondition() {
	//
	const {
		isMoblieShowFilterDetailsCondition,
		setIsMoblieShowFilterDetailsCondition,
		createQueryString,
	} = useSearchContext();

	const pathname = usePathname();
	const searchParams = useSearchParams();

	const complete = searchParams?.get("complete") || "";
	const update_time = searchParams?.get("update_time") || "";
	const words = searchParams?.get("words") || "";

	return (
		<section
			className={
				`overflow-hidden max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 max-md:z-30 max-md:bg-[rgba(0,0,0,0.7)] ` +
				` transition-opacity duration-200` +
				` ${isMoblieShowFilterDetailsCondition ? " max-md:scale-x-100 max-md:opacity-100" : " max-md:scale-x-0 max-md:opacity-0"} `
			}
			style={{
				transition: isMoblieShowFilterDetailsCondition
					? ""
					: " transform 0s ease 0.4s, opacity 0.2s ease 0.4s",
			}}
			onClick={() => setIsMoblieShowFilterDetailsCondition(false)}
		>
			<section
				className={
					"flex flex-col items-stretch justify-start gap-4 " +
					` max-md:absolute max-md:right-0 max-md:top-0 max-md:h-full max-md:w-[calc(100%-60px)] max-md:bg-landscape-300 max-md:px-4 max-md:py-6` +
					` duration-400 max-md:transition-transform` +
					` ${isMoblieShowFilterDetailsCondition ? " delay-300 max-md:translate-x-0" : " max-md:translate-x-[100%]"} `
				}
			>
				<p className="rounded-md bg-landscape-450 px-[10px] py-[5px]">
					條件篩選
				</p>

				{/* 字數 */}
				<div className="grid grid-cols-1 gap-2 pb-2">
					<p className="px-[10px] font-normal text-primary-200">字數</p>
					<nav className="flex flex-wrap content-start justify-start gap-2">
						{filterWordCounts.map((wordCount) => (
							<Link
								key={wordCount.id}
								href={
									pathname +
									"?" +
									createQueryString(wordCount.paramKey, wordCount.paramVal)
								}
								className={
									"inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300 " +
									` ${words === wordCount.paramVal ? " !border-accent-300 !text-accent-300 *:text-accent-300" : ""} `
								}
							>
								<span>{wordCount.title}</span>
								{words === wordCount.paramVal && words !== "" && (
									<NestedLink
										link={
											pathname + "?" + createQueryString(wordCount.paramKey, "")
										}
									>
										✕
									</NestedLink>
								)}
							</Link>
						))}
					</nav>
				</div>

				{/* 狀態 */}
				<div className="grid grid-cols-1 gap-2 pb-2">
					<p className="px-[10px] font-normal text-primary-200">狀態</p>
					<nav className="flex flex-wrap content-start justify-start gap-2">
						{filterStatus.map((wordCount) => (
							<Link
								key={wordCount.id}
								href={
									pathname +
									"?" +
									createQueryString(wordCount.paramKey, wordCount.paramVal)
								}
								className={
									"inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300 " +
									` ${complete === wordCount.paramVal ? " !border-accent-300 !text-accent-300 *:text-accent-300" : ""} `
								}
							>
								<span>{wordCount.title}</span>
								{complete === wordCount.paramVal && complete !== "" && (
									<NestedLink
										link={
											pathname + "?" + createQueryString(wordCount.paramKey, "")
										}
									>
										✕
									</NestedLink>
								)}
							</Link>
						))}
					</nav>
				</div>

				{/* 更新時間 */}
				<div className="grid grid-cols-1 gap-2 pb-2">
					<p className="px-[10px] font-normal text-primary-200">更新時間</p>
					<nav className="flex flex-wrap content-start justify-start gap-2">
						{filterTimeAreas.map((wordCount) => (
							<Link
								key={wordCount.id}
								href={
									pathname +
									"?" +
									createQueryString(wordCount.paramKey, wordCount.paramVal)
								}
								className={
									"inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300 " +
									` ${update_time === wordCount.paramVal ? " !border-accent-300 !text-accent-300 *:text-accent-300" : ""} `
								}
							>
								<span>{wordCount.title}</span>
								{update_time === wordCount.paramVal && update_time !== "" && (
									<NestedLink
										link={
											pathname + "?" + createQueryString(wordCount.paramKey, "")
										}
									>
										✕
									</NestedLink>
								)}
							</Link>
						))}
					</nav>
				</div>
			</section>
		</section>
	);
}

export default function FilterAside({
	categoryDatas,
}: {
	categoryDatas: CateData[];
}) {
	return (
		<section className="grid grid-cols-1 gap-6">
			{/* -- 分類 -- */}
			<FilterCate categoryDatas={categoryDatas} />

			{/* -- 條件篩選 -- */}
			<FilterDetailsCondition />
		</section>
	);
}
