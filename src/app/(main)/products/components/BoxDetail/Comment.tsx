"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { type CommentType } from "../../page";

import { UiButton } from "@/components/ui/client";

//
const commentRules = [
	"請勿散佈不實言論、詆毀他人名譽或佯裝他人身分。",
	"請勿複製並發佈他人的素材、商標、智慧財產或未經事前授權的商業行為。",
	"請勿發佈冒犯、猥褻、謾罵言詞，評論不應流於騷擾、謾罵或威脅他人生命財產安全及令人不悅之內容。",
	"請勿發佈病毒或其他惡意程式，致使他人產生使用困擾。",
	"為維護隱私權，請勿發佈您或他人的個人隱私或機密資訊，例如郵寄地址、身份證件號碼、電子郵件地址或連結及任何其他未公開的資訊。",
	"請遵守以上留言規範，避免違反相關條款。",
];

//
function FeedbackToggler({
	children,
	className,
	feedbackLength,
	childrenLike,
}: {
	children: React.ReactNode;
	childrenLike: React.ReactNode;
	feedbackLength: number;
	className?: string;
}) {
	//
	const [isTurnOn, setIsTurnOn] = useState(false);

	return (
		<>
			{/* - */}
			<div className="flex items-center justify-between">
				<nav className="flex items-center justify-center gap-4">
					{/* -- */}
					<p
						className="flex cursor-pointer items-center justify-center gap-[2px]"
						onClick={() => setIsTurnOn((v) => !v)}
					>
						<i className="i-follow scale-125 text-ash-600"></i>
						<span className="block translate-y-[2px] text-xs text-ash-600">
							回覆
						</span>
						<b className="translate-y-[1px] text-ash-600">{feedbackLength}</b>
					</p>

					{/* -- */}
					{childrenLike}
				</nav>

				<span className="flex cursor-pointer items-end justify-center">
					<i className="i-attention translate-y-[2px] scale-[120%] text-ash-500"></i>
					<b className="ml-[-1px] text-xs text-ash-500">檢舉</b>
				</span>
			</div>

			{/* - */}
			<div
				className={`grid transition-all duration-300 ease-linear ${isTurnOn ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ${className}`}
			>
				{children}
			</div>
		</>
	);
}

//
export default function Comment({ comment }: { comment: CommentType[] }) {
	//
	const [isCommentRuleExpanded, setIsCommentRuleExpanded] = useState(false);

	//
	useEffect(() => {}, []);

	return (
		<>
			<section id="comment">
				<div className="mb-4 flex items-end justify-between pt-5">
					<h3 className="flex items-center justify-start gap-1">
						<span className="text-xl font-normal">留言</span>
						<span className="font-normal text-ash-600">{comment.length}</span>
					</h3>
					<button
						className="rounded-lg border border-landscape-450 px-2 text-sm text-ash-600"
						onClick={() => setIsCommentRuleExpanded(!isCommentRuleExpanded)}
					>
						留言規範
					</button>
				</div>

				<div
					className={
						"duration-400 grid transition-all ease-linear " +
						`${isCommentRuleExpanded ? " grid-rows-[1fr]" : " grid-rows-[0fr]"}`
					}
				>
					<article className="overflow-hidden break-words text-sm">
						<p className="mb-3 font-normal">
							發佈留言，請遵守以下規範，讓所有讀者及創作者皆可擁有一個充滿樂趣且安全的互動空間，並保障所有人有更好的閱讀體驗。
						</p>
						<ul className="flex flex-col justify-start gap-3 pb-4">
							{commentRules.map((rule, i) => (
								<li key={i} className="flex items-start justify-start">
									<span className="px-2 font-normal text-ash-850">⦁</span>
									<p className="font-normal text-ash-850">{rule}</p>
								</li>
							))}
						</ul>
					</article>
				</div>

				<section>
					<div className="relative">
						<textarea
							className={`block w-full resize-none rounded-lg border border-landscape-450 bg-transparent px-6 py-4 font-normal text-ash-850 transition-all duration-300 ease-linear placeholder:font-light focus:bg-white focus:outline-none active:outline-none`}
							cols={30}
							rows={5}
							placeholder="歡迎大家留言，但請避免不雅字眼、具歧視及仇恨言論，同時不要散佈垃圾訊息，共同維持良好的交流環境。"
						></textarea>
						<span className="absolute bottom-1 right-4 text-ash-650">360</span>
					</div>
					<div className="py-4 text-right">
						<UiButton variant="primary" className="w-24">
							新增留言
						</UiButton>
					</div>
				</section>

				<ul>
					{comment.map((comment) => (
						<li
							key={comment.id}
							className="mb-2 border-b border-landscape-450 px-6 py-4 max-lg:px-0"
						>
							{/*  */}
							<div className="mb-2 flex flex-col items-stretch justify-start gap-2">
								<p className="font-semibold text-ash-850">{comment.name}</p>
								<p className="text-ash-850">{comment.context}</p>
								<time className="text-xs text-ash-500">
									{comment.time.toLocaleDateString()}
								</time>
							</div>

							<FeedbackToggler
								feedbackLength={comment.feedbacks.length}
								childrenLike={
									<p className="flex cursor-pointer items-center justify-center gap-[2px]">
										<i className="i-like scale-[120%] text-ash-600"></i>
										<b className="translate-y-[1px] text-ash-600">
											{comment.likesNumber}
										</b>
									</p>
								}
							>
								<ul className="overflow-hidden">
									{comment.feedbacks.map((feedback) => (
										<li
											key={feedback.id}
											className="relative ml-6 mt-8 rounded-lg bg-landscape-400 px-6 py-4"
										>
											<b
												className="absolute left-0 top-[-16px] block h-6 w-6 bg-landscape-400"
												style={{
													clipPath: "polygon(0 0, 0% 100%, 100% 100%)",
												}}
											></b>
											<p className="font-semibold text-ash-850">
												{feedback.name}
											</p>
											<div className="mt-2 text-ash-850">
												{feedback.context}
											</div>
											<time className="mt-2 inline-block text-xs text-ash-500">
												{feedback.time.toLocaleDateString()}
											</time>
										</li>
									))}
									<li className="ml-6 mt-5">
										<div className="relative">
											<textarea
												className={`block w-full resize-none rounded-lg border border-landscape-450 bg-transparent px-6 py-4 font-normal text-ash-850 transition-all duration-300 ease-linear placeholder:font-light focus:bg-white focus:outline-none active:outline-none`}
												cols={30}
												rows={5}
												placeholder="撰寫回覆"
											></textarea>
											<span className="absolute bottom-1 right-4 text-ash-650">
												500
											</span>
										</div>
										<div className="py-4 text-right">
											<UiButton variant="primary" className="w-16">
												回覆
											</UiButton>
										</div>
									</li>
								</ul>
							</FeedbackToggler>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
