"use client";

import React, { useState } from "react";
import { UiButton } from "@/components/customUI/client";

export default function LoadMore({
	onClick,
	totalAmount,
	loadedAmount,
}: {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	totalAmount: number;
	loadedAmount: number;
}) {
	return (
		<div className="grid gap-3 py-12 text-center">
			<UiButton
				variant="secondary"
				className="w-40 rounded-[3px]"
				onClick={onClick}
			>
				載入更多
			</UiButton>
			<p className="flex items-center justify-center gap-2 *:text-ash-500">
				<span>{loadedAmount}</span>
				<span>of</span>
				<span>{totalAmount}</span>
			</p>
		</div>
	);
}
