import React from "react";
import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: string }) {
	// return (
	// 	<ul
	// 		className={cn(
	// 			"m-auto flex items-center justify-center gap-1 *:flex-shrink-0",
	// 			className || ""
	// 		)}
	// 	>
	// 		<li className="font-bold text-primary-300">Loadin</li>
	// 		<li
	// 			className="load-animation w-1 text-primary-300"
	// 			style={{ animation: "loadAnimation 1.5s 0.2s linear infinite both" }}
	// 		>
	// 			g
	// 		</li>
	// 		<li
	// 			className="load-animation aspect-square w-1 rounded-full bg-primary-300"
	// 			style={{ animation: "loadAnimation 1.5s 0.4s linear infinite both" }}
	// 		></li>
	// 		<li
	// 			className="load-animation aspect-square w-1 rounded-full bg-primary-300"
	// 			style={{ animation: "loadAnimation 1.5s 0.6s linear infinite both" }}
	// 		></li>
	// 		<li
	// 			className="load-animation aspect-square w-1 rounded-full bg-primary-300"
	// 			style={{ animation: "loadAnimation 1.5s 0.8s linear infinite both" }}
	// 		></li>
	// 	</ul>
	// );

	return (
		<ul
			className={cn(
				"* m-auto flex items-center justify-center text-2xl *:flex-shrink-0",
				className || ""
			)}
		>
			<li className="text-ash-650">Loa</li>
			<li
				className="load-animation-s text-ash-650"
				style={{ animation: "loadAnimationS 1.5s 0s linear infinite both" }}
			>
				d
			</li>
			<li
				className="load-animation-s text-ash-650"
				style={{ animation: "loadAnimationS 1.5s 0.15s linear infinite both" }}
			>
				i
			</li>
			<li
				className="load-animation-s text-ash-650"
				style={{ animation: "loadAnimationS 1.5s 0.3s linear infinite both" }}
			>
				n
			</li>
			<li
				className="load-animation-s text-ash-650"
				style={{ animation: "loadAnimationS 1.5s 0.45s linear infinite both" }}
			>
				g
			</li>
			<li
				className="load-animation-m text-ash-650"
				style={{ animation: "loadAnimationM 1.5s 0.6s linear infinite both" }}
			>
				•
			</li>
			<li
				className="load-animation-m -mx-1 text-ash-650"
				style={{ animation: "loadAnimationM 1.5s 0.8s linear infinite both" }}
			>
				•
			</li>
			<li
				className="load-animation-m text-ash-650"
				style={{ animation: "loadAnimationM 1.5s 1s linear infinite both" }}
			>
				•
			</li>
		</ul>
	);
}
