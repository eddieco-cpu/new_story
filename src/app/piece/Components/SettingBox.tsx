"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { usePieceContext } from "@contexts/pieceContext";

import useMode from "../Hooks/useMode";
import { Cross as CrossIcon } from "@components/customUI/svg";
import LineHeightIcon from "./LineHeightIcon";

//type FontSizeType = 16 | 18 | 20 | 22 | 24 | 26 ;
type LineHeightType = "S" | "M" | "L";
const lineHeights: LineHeightType[] = ["S", "M", "L"];

const minFontSize = 16;
const maxFontSize = 26;

export default function SettingBox() {
	//
	const {
		isSettingBox,
		setIsSettingBox,
		fontSize,
		setFontSize,
		setLineHeight,
		lineHeight,
	} = usePieceContext();

	const [mode, toggleMode] = useMode();

	//
	const doSetFontSize = (size: number) => {
		localStorage.setItem("piece-font-size", size.toString());
		setFontSize(size);
	};
	const doSetLineHeight = (lh: LineHeightType) => {
		localStorage.setItem("piece-line-height", lh);
		setLineHeight(lh);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storeFontSize = localStorage.getItem("piece-font-size");
			const initFontSize =
				storeFontSize &&
				(parseInt(storeFontSize) <= maxFontSize ||
					parseInt(storeFontSize) >= minFontSize)
					? parseInt(storeFontSize)
					: 20;

			const storeLineHeight = localStorage.getItem(
				"piece-line-height"
			) as LineHeightType;
			const initLineHeight = lineHeights.includes(storeLineHeight)
				? storeLineHeight
				: "S";

			setFontSize(initFontSize);
			setLineHeight(initLineHeight);
		}
	}, []);

	return (
		<>
			<div
				className={
					"fixed bottom-0 left-0 right-0 top-0 z-20 m-auto transition-[background-color] max-lg:bottom-[60px] " +
					(isSettingBox
						? " pointer-events-auto scale-100 bg-[rgba(0,0,0,0.7)]"
						: " pointer-events-none scale-0")
				}
				onClick={() => setIsSettingBox(false)}
			>
				{
					<div
						className={
							"absolute bottom-0 left-0 right-0 top-0 m-auto aspect-[403/368] w-[403px] bg-white p-6 lg:rounded-lg " +
							` max-lg:top-auto max-lg:aspect-auto max-lg:w-full` +
							` transition-opacity delay-200 duration-200` +
							(isSettingBox ? " scale-100 opacity-100" : " scale-0 opacity-0")
						}
						onClick={(e) => e.stopPropagation()}
					>
						<p className="flex justify-end max-lg:hidden">
							<span onClick={() => setIsSettingBox(false)}>
								<CrossIcon></CrossIcon>
							</span>
						</p>
						<div className="px-9 py-3">
							<p className="h-[60px] border-b border-landscape-450 text-center text-2xl font-medium leading-[60px]">
								主題
							</p>
							<ul className="grid gap-6 py-4">
								<li className="grid grid-cols-[auto_1fr] gap-6">
									<p>字級</p>
									<div className="flex items-center justify-center rounded-lg border border-landscape-450 *:h-8 *:w-1/3">
										<button
											onClick={() =>
												fontSize > minFontSize && doSetFontSize(fontSize - 2)
											}
										>
											A-
										</button>
										<p className="flex items-center justify-center border-l border-r border-landscape-450 text-center text-accent-300">
											{fontSize}
										</p>
										<button
											onClick={() =>
												fontSize < maxFontSize && doSetFontSize(fontSize + 2)
											}
										>
											A+
										</button>
									</div>
								</li>
								<li className="grid grid-cols-[auto_1fr] gap-6">
									<p>行高</p>
									<div className="flex items-center justify-center rounded-lg border border-landscape-450 *:h-8 *:w-1/3">
										<button onClick={() => doSetLineHeight("S")}>
											<LineHeightIcon
												className={
													"gap-[3px] " +
													`${lineHeight === "S" ? " *:bg-accent-300" : ""}`
												}
											/>
										</button>
										<button
											className="flex items-center justify-center border-l border-r border-landscape-450 text-center"
											onClick={() => doSetLineHeight("M")}
										>
											<LineHeightIcon
												className={`${lineHeight === "M" ? "*:bg-accent-300" : ""}`}
											/>
										</button>
										<button onClick={() => doSetLineHeight("L")}>
											<LineHeightIcon
												className={
													"gap-[7px] " +
													`${lineHeight === "L" ? " *:bg-accent-300" : ""}`
												}
											/>
										</button>
									</div>
								</li>
								<li className="grid grid-cols-[auto_1fr] gap-6">
									<p>主題</p>
									<p className="flex items-center justify-between">
										<button
											data-piece-mode="default"
											className="mode-btn block aspect-square w-6 rounded-full ring-1 ring-landscape-450"
											onClick={() => toggleMode("default")}
										></button>
										<button
											data-piece-mode="yellow"
											className="mode-btn block aspect-square w-6 rounded-full bg-[#FFE2A2] ring-1 ring-landscape-450"
											onClick={() => toggleMode("yellow")}
										></button>
										<button
											data-piece-mode="blue"
											className="mode-btn block aspect-square w-6 rounded-full bg-[#B8D5EA] ring-1 ring-landscape-450"
											onClick={() => toggleMode("blue")}
										></button>
										<button
											data-piece-mode="green"
											className="mode-btn block aspect-square w-6 rounded-full bg-[#D7E8CA] ring-1 ring-landscape-450"
											onClick={() => toggleMode("green")}
										></button>
										<button
											data-piece-mode="dark"
											className="mode-btn block aspect-square w-6 rounded-full bg-[#363636] ring-1 ring-landscape-450"
											onClick={() => toggleMode("dark")}
										></button>
									</p>
								</li>
							</ul>
						</div>
					</div>
				}
			</div>
		</>
	);
}
