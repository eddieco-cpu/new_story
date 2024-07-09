"use client";
import React, { useState } from "react";

import { IntroCard } from "@/types/cate";

import Introduction from "./Introduction";

type IntroductionType = {
	id: string;
	name: string;
};

export default function Index({
	mainIntroCards,
}: {
	mainIntroCards: IntroCard[];
}) {
	//
	const [introductionTypes] = useState<IntroductionType[]>([
		{
			id: "A",
			name: "大家都在搜",
		},
		{
			id: "B",
			name: "本週七折小說",
		},
		{
			id: "C",
			name: "創編精選",
		},
		{
			id: "D",
			name: "本月言情主打星",
		},
		{
			id: "E",
			name: "新鮮上架小說",
		},
	]);
	const [activeIntroductionType, setActiveIntroductionType] =
		useState<string>("A");

	return (
		<article className="grid grid-cols-[1fr_auto] gap-x-7 max-xl:grid-cols-[auto_auto] max-xl:gap-0 max-lg:grid-cols-1 max-lg:grid-rows-[auto_auto]">
			<Introduction
				introCards={mainIntroCards}
				className={
					"max-xl:w-[calc(970px-270px)] max-lg:row-start-2 max-lg:w-auto"
				}
			/>
			<ul className="grid grid-rows-5 gap-6 overflow-auto px-8 py-4 scrollbar-hide max-xl:w-[270px] max-xl:p-4 max-lg:row-start-1 max-lg:w-auto max-lg:grid-flow-col max-lg:grid-rows-1 max-lg:gap-4">
				{introductionTypes.map((type) => (
					<li
						key={type.id}
						className={
							"flex w-[246px] cursor-pointer items-center justify-center whitespace-nowrap rounded-lg text-xl font-normal hover:text-primary-200 max-xl:w-auto max-lg:inline-flex max-lg:p-2" +
							(activeIntroductionType === type.id ? " bg-white font-bold" : "")
						}
						onClick={() => setActiveIntroductionType(type.id)}
					>
						{type.name}
					</li>
				))}
			</ul>
		</article>
	);
}
