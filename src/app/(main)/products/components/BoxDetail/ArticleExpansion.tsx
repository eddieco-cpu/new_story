"use client";

import React, { useState } from "react";
import { replaceNewlinesWithBreaks } from "@/lib/helper";

export default function ArticleExpansion({ article }: { article: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={
				"grid min-h-36 transition-all duration-500 ease-in " +
				`${isExpanded ? " grid-rows-[1fr]" : " grid-rows-[0fr]"}`
			}
		>
			<article
				className="min-h-36 overflow-hidden break-words text-base font-normal text-ash-850"
				dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBreaks(article) }}
			></article>
			<section
				className={
					"mt-[-40px] overflow-hidden transition-all delay-500 duration-0 ease-linear " +
					`${!isExpanded ? " h-[122px]" : " h-16 opacity-0"}`
				}
			>
				<div
					className="group h-16 border-b border-landscape-450"
					style={{
						backgroundImage:
							"linear-gradient(to top, var(--landscape-300-rgb), rgba(0,0,0,0))",
					}}
				></div>
				<div
					className="group cursor-pointer text-center"
					onClick={() => setIsExpanded(true)}
				>
					<p className="pb-[6px] pt-2 font-normal text-ash-850 transition-all duration-200 group-active:text-accent-300">
						閱讀更多
					</p>
					<i className="i-arrow7-down inline-block translate-y-[-25%] text-xl text-ash-900 transition-all duration-200 group-hover:animate-bounce group-active:text-accent-300"></i>
				</div>
			</section>
		</div>
	);
}
