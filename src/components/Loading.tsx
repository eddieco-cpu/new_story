import React from "react";
import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: string }) {
	return (
		<ul
			className={cn(
				"m-auto flex items-center justify-center *:flex-shrink-0",
				className || ""
			)}
		>
			<li className="font-mono text-ash-650">L</li>
			<li
				className="load-animation-s font-mono text-ash-650"
				style={{ animation: "loadAnimationS 1.2s 0.1s linear infinite both" }}
			>
				o
			</li>
			<li
				className="load-animation-s font-mono text-ash-650"
				style={{ animation: "loadAnimationS 1.2s 0.2s linear infinite both" }}
			>
				a
			</li>
			<li
				className="load-animation-s font-mono text-ash-650"
				style={{ animation: "loadAnimationS 1.2s 0.3s linear infinite both" }}
			>
				d
			</li>
			<li
				className="load-animation-s font-mono text-ash-650"
				style={{ animation: "loadAnimationS 1.2s 0.4s linear infinite both" }}
			>
				i
			</li>
			<li
				className="load-animation-s font-mono text-ash-650"
				style={{ animation: "loadAnimationS 1.2s 0.5s linear infinite both" }}
			>
				n
			</li>
			<li
				className="load-animation-s font-mono text-ash-650"
				style={{ animation: "loadAnimationS 1.2s 0.6s linear infinite both" }}
			>
				g
			</li>
			<li
				className="load-animation-m -mb-1 ml-[-2px] text-ash-650"
				style={{ animation: "loadAnimationM 1.2s 0.75s linear infinite both" }}
			>
				•
			</li>
			<li
				className="load-animation-m mx-[-6px] -mb-1 text-ash-650"
				style={{ animation: "loadAnimationM 1.2s 0.85s linear infinite both" }}
			>
				•
			</li>
			<li
				className="load-animation-m -mb-1 text-ash-650"
				style={{ animation: "loadAnimationM 1.2s 0.95s linear infinite both" }}
			>
				•
			</li>
		</ul>
	);
}
