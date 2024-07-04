import Link from "next/link";
import React from "react";

import { SortBook } from "@/types/cate";

import List from "./List";

import { UiMoreLink } from "@components/UI";
import "@styles/components/sortBox.scss";

export default function Index({
	cardSorts,
	cardName,
	cardLink,
}: {
	cardSorts: SortBook[];
	cardName: string;
	cardLink: string;
}) {
	return (
		<div className="relative w-[286px] overflow-hidden">
			<p className="mb-3 mt-2 flex items-end justify-between px-4">
				<b className="pl-[38px] text-xl font-normal tracking-[4px] text-secondary-700">
					{cardName}
				</b>
				<UiMoreLink href={cardLink} />
			</p>

			<div className="absolute left-[-2px] top-[14px] z-[-1] h-14 w-[calc(100%+2px)] rotate-[-6deg] rounded-t-[30px] bg-landscape-500"></div>

			<List {...{ cardSorts }} className="bg-landscape-500" />
		</div>
	);
}
