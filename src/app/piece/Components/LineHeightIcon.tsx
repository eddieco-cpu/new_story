import React from "react";
import { cn } from "@/lib/utils";

export default function LineHeightIcon({ className }: { className?: string }) {
	return (
		<ul
			className={cn(
				"m-auto flex h-6 w-4 flex-col items-center justify-center gap-[5px]",
				className || ""
			)}
		>
			<li className="h-[1px] w-full bg-ash-850"></li>
			<li className="h-[1px] w-full bg-ash-850"></li>
			<li className="h-[1px] w-full bg-ash-850"></li>
		</ul>
	);
}
