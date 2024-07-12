"use client";

import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

//
const filterCates = [
	{
		id: 11,
		title: "全部",
		link: "",
	},
	{
		id: 12,
		title: "琅琅原創",
		link: "",
	},
	{
		id: 13,
		title: "漫畫",
		link: "",
	},
	{
		id: 14,
		title: "言情",
		link: "",
	},
	{
		id: 15,
		title: "輕小說",
		link: "",
	},
	{
		id: 21,
		title: "玄幻",
		link: "",
	},
	{
		id: 22,
		title: "懸疑",
		link: "",
	},
	{
		id: 23,
		title: "冒險",
		link: "",
	},
	{
		id: 24,
		title: "靈異",
		link: "",
	},
	{
		id: 25,
		title: "BL",
		link: "",
	},
	{
		id: 35,
		title: "18+",
		link: "",
	},
];

const filterWordCounts = [
	{
		id: 31,
		title: "全部",
		link: "",
	},
	{
		id: 32,
		title: "1萬以下",
		link: "",
	},
	{
		id: 33,
		title: "1萬~3萬",
		link: "",
	},
	{
		id: 34,
		title: "3萬~5萬",
		link: "",
	},
	{
		id: 35,
		title: "5萬~10萬",
		link: "",
	},
	{
		id: 36,
		title: "10萬以上",
		link: "",
	},
];

const filterStatus = [
	{
		id: 41,
		title: "全部",
		link: "",
	},
	{
		id: 42,
		title: "連載中",
		link: "",
	},
	{
		id: 43,
		title: "已完結",
		link: "",
	},
];

const filterTimeAreas = [
	{
		id: 51,
		title: "全部",
		link: "",
	},
	{
		id: 52,
		title: "3日內",
		link: "",
	},
	{
		id: 53,
		title: "7日內",
		link: "",
	},
	{
		id: 54,
		title: "半月內",
		link: "",
	},
	{
		id: 55,
		title: "一月內",
		link: "",
	},
];

function FilterCate() {
	return (
		<section
			className={
				"flex flex-col items-stretch justify-start gap-4 " +
				` max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 max-md:z-30 max-md:hidden max-md:bg-[rgba(0,0,0,0.7)]`
			}
		>
			<p className="rounded-md bg-landscape-450 px-[10px] py-[5px] max-md:hidden">
				分類
			</p>
			<nav
				className={
					"flex flex-wrap content-start justify-start gap-2 " +
					` max-md:absolute max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 max-md:m-auto max-md:h-fit max-md:w-[calc(100%-40px)] max-md:flex-col max-md:content-center max-md:items-center max-md:justify-center max-md:gap-4 max-md:rounded-lg max-md:bg-white max-md:p-5`
				}
			>
				{filterCates.map((cate) => (
					<Link
						key={cate.id}
						href={cate.link}
						className={
							"inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300 " +
							` max-md:justify-center max-md:border-transparent max-md:py-1`
						}
					>
						<span className="max-md:text-base max-md:font-medium">
							{cate.title}
						</span>
					</Link>
				))}
			</nav>
		</section>
	);
}

function FilterDetailsCondition() {
	return (
		<section
			className={`max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 max-md:z-30 max-md:hidden max-md:bg-[rgba(0,0,0,0.7)]`}
		>
			<section
				className={
					"flex flex-col items-stretch justify-start gap-4 " +
					` max-md:absolute max-md:right-0 max-md:top-0 max-md:h-full max-md:w-[calc(100%-60px)] max-md:bg-landscape-300 max-md:px-4 max-md:py-6`
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
								href={wordCount.link}
								className="inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300"
							>
								<span>{wordCount.title}</span>
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
								href={wordCount.link}
								className="inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300"
							>
								<span>{wordCount.title}</span>
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
								href={wordCount.link}
								className="inline-flex shrink-0 items-start justify-start gap-2 rounded-lg border border-ash-350 px-[10px] py-[5px] text-base font-normal text-ash-900 hover:text-accent-300"
							>
								<span>{wordCount.title}</span>
							</Link>
						))}
					</nav>
				</div>
			</section>
		</section>
	);
}

export default function FilterAside() {
	return (
		<section className="grid grid-cols-1 gap-6">
			{/* -- 分類 -- */}
			<FilterCate />

			{/* -- 條件篩選 -- */}
			<FilterDetailsCondition />
		</section>
	);
}