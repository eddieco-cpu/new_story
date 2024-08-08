"use client";
import React, { useState } from "react";
import { useSearchContext } from "@contexts/searchContext";

import { UiTitle } from "@/components/customUI";
import {
	Sorting as SortingIcon,
	Selecting as SelectingIcon,
} from "@/components/customUI/svg";

export default function FilterBar() {
	//
	const {
		isMoblieShowFilterCate,
		setIsMoblieShowFilterCate,
		isMoblieShowFilterDetailsCondition,
		setIsMoblieShowFilterDetailsCondition,
		isShowSortOption,
		setIsShowSortOption,
		sortOptions,
		setSortOptions,
	} = useSearchContext();

	return (
		<div className="flex items-center justify-between gap-y-5 max-md:flex-wrap max-md:content-between max-md:px-5">
			<UiTitle className="pl-1 max-md:w-full">全站分類</UiTitle>

			<button
				className="flex h-9 items-center justify-between gap-1 *:flex-shrink-0 max-md:w-32 max-md:rounded-3xl max-md:border max-md:border-ash-300 max-md:bg-white max-md:px-[10px] max-md:py-1 md:hidden"
				onClick={() => setIsMoblieShowFilterCate(true)}
			>
				<b className="text-sm font-normal text-ash-600">分類</b>
				<i className="i-arrow5-down text-sm text-ash-600" />
			</button>

			<nav className="flex items-center justify-center gap-2 *:flex-shrink-0">
				<button
					className="flex h-9 items-center justify-center gap-1 *:flex-shrink-0 max-md:w-16 max-md:rounded-3xl max-md:border max-md:border-ash-300 max-md:bg-white max-md:px-[10px] max-md:py-1 md:pointer-events-none"
					onClick={() => setIsMoblieShowFilterDetailsCondition(true)}
				>
					<SortingIcon />
					<b className="text-sm font-normal text-ash-600 max-md:hidden">排序</b>
					<i className="i-arrow5-down text-sm text-ash-600 md:hidden" />
				</button>
				<div
					className="relative flex h-9 w-[152px] cursor-pointer items-center justify-center rounded-3xl border border-ash-300 bg-white px-4 py-1 max-md:w-16 max-md:px-[10px]"
					onClick={() => setIsShowSortOption(true)}
				>
					<p className="flex w-full items-center justify-between">
						<span className="text-sm tracking-[2px] text-ash-600 max-md:hidden">
							{sortOptions.find((el) => el.isSelected)?.name}
						</span>
						<span className="md:hidden">
							<SelectingIcon />
						</span>
						<i className="i-arrow5-down text-sm text-ash-600" />
					</p>
					{
						<ul
							className={
								"absolute left-0 top-10 z-[6] m-auto overflow-hidden rounded-lg bg-white shadow-2xl transition-opacity duration-300 *:p-1 *:max-md:mb-3 " +
								` max-md:fixed max-md:bottom-0 max-md:right-0 max-md:top-0 max-md:z-30 max-md:h-fit max-md:max-w-[calc(100vw-40px)]` +
								` ${isShowSortOption ? " w-[101%] p-4 opacity-100 max-md:p-5 max-md:pb-2 max-md:delay-300" : " w-0 p-0 opacity-0"}`
							}
							//onClick={(e) => (e.stopPropagation(), setIsShowSortOption(true))}
						>
							{sortOptions.map((el) => (
								<li
									key={el.id}
									className={
										"hover:bg-ash-200 " +
										`${el.isSelected ? " *:text-accent-300" : ""}`
									}
									onClick={(e) => (
										e.stopPropagation(),
										setSortOptions((arr) =>
											arr.map((it) => ({ ...it, isSelected: it.id === el.id }))
										),
										setIsShowSortOption(false)
									)}
								>
									<p>{el.name}</p>
								</li>
							))}
						</ul>
					}
					{
						<div
							className={
								"fixed bottom-0 left-0 right-0 top-0 z-[5] max-md:z-[29] max-md:bg-[rgba(0,0,0,0.7)]" +
								` ${isShowSortOption ? " opacity-100 max-md:transition-opacity max-md:delay-75" : " pointer-events-none w-0 opacity-0 max-md:w-auto"}`
							}
							onClick={(e) => (
								e.stopPropagation(), setIsShowSortOption((v) => !v)
							)}
						></div>
					}
				</div>
			</nav>
		</div>
	);
}
