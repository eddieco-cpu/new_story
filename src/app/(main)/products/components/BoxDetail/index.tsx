"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import ArticleExpansion from "./ArticleExpansion";
import ChaptersList from "./ChaptersList";
import Comment from "./Comment";

import { type Chapter } from "@/types/chapter";

import ViolationReportButton from "@/components/customUI/ViolationReportButton";
import ViolationReportBox from "@/components/ViolationReportBox";

import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";

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
	title,
	productChapters,
}: {
	detail: DetailType;
	publish_article: string;
	summary: string;
	productId: string;
	title: string;
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

	function setViolationReportBox() {
		BlockPopupModal.setChildren(
			<ViolationReportBox id={productId} name={title} />
		);
		BlockPopupModal.setBlockClassName(
			" w-[900px] h-[647px] max-h-[calc(100vh-40px)] pb-6 max-lg:pb-6"
		);
		BlockPopupModal.setIsOpen(true);
	}

	return (
		<>
			<section className="ring-1">
				{/***/}
				<div className="relative flex items-end justify-start border-b border-landscape-400 px-6">
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
					<ViolationReportButton
						name="舉報"
						className="absolute bottom-0 right-8 top-0 my-auto h-6"
						onClick={setViolationReportBox}
					/>
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
