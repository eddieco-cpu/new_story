"use client";

import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useCallback } from "react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from "@/components/ui/popover";

import { type CateData, type FetchedCateData } from "@/types/cate";

//
export default function FilterCate({
	categoryDatas,
}: {
	categoryDatas: CateData[];
}) {
	//
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const category = searchParams?.get("category") || "";

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	//
	return (
		<Popover>
			<PopoverTrigger className="flex w-40 items-center justify-between gap-1 rounded-full bg-white px-5 py-1 ring-1 ring-ash-350">
				<p className="flex items-center justify-start gap-2">
					<b className="block scale-x-[135%] text-[#3399CC]">#</b>
					<span>
						{categoryDatas.find((el) => el.id === category)?.name || "全部"}
					</span>
				</p>
				<i className="i-arrow5-down text-xs"></i>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-40 rounded-xl bg-white p-0 py-2">
				{[{ name: "全部", id: "" }, ...categoryDatas].map((cate, i) => (
					<PopoverClose asChild key={cate.id + i}>
						<p className="py-2 text-center">
							<span
								className={
									"cursor-pointer text-center hover:text-accent-250 " +
									`${category === cate.id ? " text-accent-300" : ""}`
								}
								onClick={() =>
									router.push(
										pathname + "?" + createQueryString("category", cate.id)
									)
								}
							>
								{cate.name}
							</span>
						</p>
					</PopoverClose>
				))}
			</PopoverContent>
		</Popover>
	);
}
