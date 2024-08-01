"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import ArticleExpansion from "./ArticleExpansion";
import ChaptersList from "./ChaptersList";
import Comment from "./Comment";

import { UiButton } from "@/components/customUI/client";
import { type Chapter } from "../../[pid]/page";

export type MessageType = {
	id: number;
	name: string;
	context: string;
	time: Date;
};
export type CommentType = MessageType & {
	likesNumber: number;
	feedbacks: MessageType[];
};
export type DetailType = {
	summary: string;
	chapter: { id: number; title: string }[];
	comment: CommentType[];
};

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

export default function Index({
	detail,
	publish_article,
	summary,
	productId,
	productChapters,
}: {
	detail: DetailType;
	publish_article: string;
	summary: string;
	productId: string;
	productChapters: Chapter[];
}) {
	//
	const [boxTypes] = useState<BoxType[]>([
		{ id: "summary", name: "簡介" },
		{ id: "chapter", name: "目錄", amount: Number(publish_article) },
		{ id: "comment", name: "留言" },
	]);
	// const [boxType, setBoxType] = useState<BoxType>({
	// 	id: "summary",
	// 	name: "簡介",
	// });
	const [boxType, setBoxType] = useState<BoxType>({
		id: "chapter",
		name: "目錄",
		amount: Number(publish_article),
	});

	const [isCommentRuleExpanded, setIsCommentRuleExpanded] = useState(false);

	//
	useEffect(() => {
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
						<ArticleExpansion article={summary}></ArticleExpansion>
					)}

					{/* -- */}
					{
						<ChaptersList
							publish_article={publish_article}
							productId={productId}
							productChapters={productChapters}
							className={boxType.id === "chapter" ? "block" : "hidden"}
						></ChaptersList>
					}

					{/* -- */}
					<Comment comment={detail.comment}></Comment>
				</article>
			</section>
		</>
	);
}
