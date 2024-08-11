"use client"

import React, { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ViolationReportButtonProps = {
	className?: string;
	name?: string;
} & ComponentPropsWithoutRef<"button">;

export default function ViolationReportButton({
	className,
	name,
	...props
}: ViolationReportButtonProps) {
	return (
		<button className={cn("flex cursor-pointer items-end justify-center", (className || ""))} {...props}>
			<i className="i-attention translate-y-[2px] scale-[120%] text-ash-500"></i>
			<b className="ml-[-1px] text-xs text-ash-500 font-normal">{name || "檢舉"}</b>
		</button>
	)
}
