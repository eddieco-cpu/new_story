"use client";

import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

type BoxType =
	| {
			id: "b";
			name: "瀏覽榜";
	  }
	| {
			id: "c";
			name: "收藏榜";
	  }
	| {
			id: "p";
			name: "暢銷榜";
	  }
	| {
			id: "n";
			name: "新書榜";
	  }
	| {
			id: "m";
			name: "留言榜";
	  };

type DateType =
	| {
			id: "w";
			name: "週";
	  }
	| {
			id: "m";
			name: "月";
	  }
	| {
			id: "t";
			name: "總";
	  };

export default function FilterNav() {
	//
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const leaderboard = searchParams?.get("leaderboard") || "b";
	const timing = searchParams?.get("timing") || "t";

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const [boxTypes] = useState<BoxType[]>([
		{
			id: "b",
			name: "瀏覽榜",
		},
		{
			id: "c",
			name: "收藏榜",
		},
		{
			id: "p",
			name: "暢銷榜",
		},
		{
			id: "n",
			name: "新書榜",
		},
		{
			id: "m",
			name: "留言榜",
		},
	]);

	const [dateTypes] = useState<DateType[]>([
		{
			id: "w",
			name: "週",
		},
		{
			id: "m",
			name: "月",
		},
		{
			id: "t",
			name: "總",
		},
	]);

	return (
		<nav className="mb-14 flex items-center justify-between gap-y-4 max-md:flex-col">
			<div className="flex items-end justify-start gap-4 overflow-x-auto max-md:w-full max-md:scrollbar-hide">
				{boxTypes.map((type) => (
					<Link
						key={type.id}
						className={
							"inline-flex cursor-pointer items-end justify-center gap-1 text-nowrap border-b-2 " +
							`${leaderboard === type.id ? "border-accent-300" : "border-transparent"} px-2`
						}
						href={pathname + "?" + createQueryString("leaderboard", type.id)}
					>
						<b
							className={
								"text-lg " +
								`${leaderboard === type.id ? "font-bold text-accent-300" : "font-normal text-ash-600"}`
							}
						>
							{type.name}
						</b>
					</Link>
				))}
			</div>

			<div className="grid grid-flow-col gap-4">
				{dateTypes.map((el) => (
					<Link
						key={el.id}
						className={
							"block aspect-square w-8 cursor-pointer rounded-full bg-white text-center text-lg leading-8 " +
							`${timing === el.id ? "font-bold text-accent-300" : "font-normal text-ash-600"}`
						}
						href={pathname + "?" + createQueryString("timing", el.id)}
					>
						{el.name}
					</Link>
				))}
			</div>
		</nav>
	);
}
