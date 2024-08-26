"use client";

import React, { ReactNode, ComponentPropsWithoutRef } from "react";

import {
	PieceCata,
	PieceDetail,
	PieceHeart,
	PieceHeartDone,
	PieceMoon,
	PieceSetting,
	PieceWarn,
} from "@components/customUI/svg";

//
type NavButtonProps = {
	icon: string;
	children: ReactNode;
	className?: string;
} & ComponentPropsWithoutRef<"button">;

function Icon({ name, className }: { name: string; className?: string }) {
	if (name === "cata")
		return (
			<PieceCata
				className={
					"*:fill-[var(--piece-text)] *:stroke-[var(--piece-text)] " +
					` group-hover:*:fill-[var(--icon-hover)] group-hover:*:stroke-[var(--icon-hover)] group-active:*:fill-[var(--icon-active)] group-active:*:stroke-[var(--icon-active)]` +
					" " +
					className
				}
			/>
		);
	if (name === "detail")
		return (
			<PieceDetail
				className={
					"*:stroke-[var(--piece-text)] " +
					` group-hover:*:stroke-[var(--icon-hover)] group-active:*:stroke-[var(--icon-active)]` +
					" " +
					className
				}
			/>
		);
	if (name === "heart")
		return (
			<PieceHeart
				className={
					"*:stroke-[var(--piece-text)] " +
					` group-hover:*:stroke-[var(--icon-hover)] group-active:*:stroke-[var(--icon-active)]` +
					className
				}
			/>
		);
	if (name === "heart-done")
		return (
			<PieceHeartDone
				className={
					"*:stroke-[var(--piece-text)] " +
					` group-hover:*:stroke-[var(--icon-hover)] group-active:*:stroke-[var(--icon-active)]` +
					className
				}
			/>
		);
	if (name === "moon")
		return (
			<PieceMoon
				className={
					"*:stroke-[var(--piece-text)] " +
					` group-hover:*:stroke-[var(--icon-hover)] group-active:*:stroke-[var(--icon-active)]` +
					className
				}
			/>
		);
	if (name === "setting") return <PieceSetting />;
	if (name === "warn")
		return (
			<PieceWarn
				className={
					"*:stroke-[var(--piece-text)] " +
					` group-hover:*:stroke-[var(--icon-hover)] group-active:*:stroke-[var(--icon-active)]` +
					className
				}
			/>
		);
	return null;
}

export default function NavButton({
	icon,
	children,
	className,
	...props
}: NavButtonProps) {
	return (
		<button
			className={
				"group flex flex-col items-center justify-center gap-1 " +
				(className || "")
			}
			{...props}
		>
			<Icon name={icon} className="*:transition-all *:duration-300" />
			<p className="text-xs text-[#8D8D8D] group-hover:text-[var(--icon-hover)] group-active:text-[var(--icon-active)]">
				{children}
			</p>
		</button>
	);
}
