"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { type DetailType } from "../../page";

import ArticleExpansion from "./ArticleExpansion";
import Comment from "./Comment";

import { UiButton } from "@/components/UI/client";

type BoxType =
	| {
			id: "summary";
			name: "簡介";
			amount?: number;
	  }
	| {
			id: "chapter";
			name: "目錄";
			amount?: number;
	  }
	| {
			id: "comment";
			name: "留言";
			amount?: number;
	  };

export default function Index({ detail }: { detail: DetailType }) {
	//
	const [boxTypes] = useState<BoxType[]>([
		{ id: "summary", name: "簡介" },
		{ id: "chapter", name: "目錄", amount: 569 },
		{ id: "comment", name: "留言" },
	]);
	const [boxType, setBoxType] = useState<BoxType>({
		id: "summary",
		name: "簡介",
	});

	const [isCommentRuleExpanded, setIsCommentRuleExpanded] = useState(false);

	//
	useEffect(() => {
		//
		console.log(detail);
	}, []);

	return (
		<>
			<section className="ring-1">
				{/***/}
				<div className="flex items-end justify-start border-b border-landscape-400 px-6">
					{boxTypes.map((type) =>
						type.id === "comment" ? (
							<Link
								href={"#" + type.id}
								key={type.id}
								className={
									"inline-flex cursor-pointer items-end justify-center gap-1 border-b-2 " +
									`${boxType.id === type.id ? "border-accent-300" : "border-transparent"} px-6 py-4`
								}
							>
								<b
									className={
										"text-lg " +
										`${boxType.id === type.id ? "font-bold text-accent-300" : "font-normal text-ash-850"}`
									}
								>
									{type.name}
								</b>
								{type.amount && (
									<span className="text-sm text-ash-850">{type.amount} 章</span>
								)}
							</Link>
						) : (
							<div
								key={type.id}
								className={
									"inline-flex cursor-pointer items-end justify-center gap-1 border-b-2 " +
									`${boxType.id === type.id ? "border-accent-300" : "border-transparent"} px-6 py-4`
								}
								onClick={() => setBoxType(type)}
							>
								<b
									className={
										"text-lg " +
										`${boxType.id === type.id ? "font-bold text-accent-300" : "font-normal text-ash-850"}`
									}
								>
									{type.name}
								</b>
								{type.amount && (
									<span className="text-sm text-ash-850">{type.amount} 章</span>
								)}
							</div>
						)
					)}
				</div>

				{/***/}
				<article className="px-6 py-5 max-md:px-5">
					{/* -- */}
					{boxType.id === "summary" && (
						<ArticleExpansion article={detail.summary}></ArticleExpansion>
					)}

					{/* -- */}
					{boxType.id === "chapter" && (
						<div>
							<p className="flex items-center justify-end">
								<span className="flex scale-y-[120%] cursor-pointer items-center justify-center">
									<i className="i-down-2 mr-[-5px] block leading-none text-accent-300"></i>
									<i className="i-up-2 ml-[-5px] block leading-none text-ash-600"></i>
								</span>
							</p>
							<ul className="grid grid-cols-2 gap-x-5 gap-y-3 px-6 py-5 max-xl:px-0 max-xl:py-4 max-md:grid-cols-1">
								{detail.chapter.map((chapter) => (
									<li
										key={chapter.id}
										className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-6 py-2 hover:bg-ash-200 active:bg-ash-300 max-xl:px-2"
									>
										<span className="flex-grow text-ash-850">
											{chapter.title}
										</span>
										<i className="i-signin flex-shrink-0 text-accent-250"></i>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* -- */}
					<Comment comment={detail.comment}></Comment>
				</article>
			</section>
		</>
	);
}
