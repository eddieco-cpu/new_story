"use client";

import React, { useState } from "react";

export default function ArticleExpansion({ article }: { article: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={
				"grid transition-all duration-500 ease-linear max-md:min-h-36 " +
				`${isExpanded ? " max-md:grid-rows-[1fr]" : " max-md:grid-rows-[0fr]"}`
			}
		>
			<article className="overflow-hidden break-words text-base font-normal text-ash-850 max-md:min-h-36">
				{article}
			</article>
			<section
				className={
					"mt-[-40px] overflow-hidden transition-all delay-300 duration-300 ease-linear md:hidden " +
					`${!isExpanded ? " h-[120px]" : " h-0"}`
				}
			>
				<div
					className="h-16 border-b border-landscape-450"
					style={{
						backgroundImage:
							"linear-gradient(to top, var(--landscape-400-rgb), rgba(0,0,0,0))",
					}}
				></div>
				<div
					className="group cursor-pointer text-center"
					onClick={() => setIsExpanded(true)}
				>
					<p className="pt-2 font-normal text-ash-850 transition-all duration-200 group-active:text-accent-300">
						閱讀更多
					</p>
					<i className="i-arrow7-down inline-block scale-125 text-ash-900 transition-all duration-200 group-active:text-accent-300"></i>
				</div>
			</section>
		</div>
	);
}
