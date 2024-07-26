"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { usePieceContext } from "@contexts/pieceContext";

import SettingBox from "./SettingBox";

import NavButton from "./NavButton";
import { Cross } from "@components/customUI/svg";

import ArticleBox from "./ArticleBox";

export default function Wrapper() {
	//
	const { setIsSettingBox } = usePieceContext();

	return (
		<>
			<aside className="sticky top-0 z-[1] block w-[60px] max-lg:w-full">
				<nav className="piece-aside m-auto mt-4 flex flex-col items-center justify-center gap-4 bg-[var(--piece-aside)] py-4 *:flex-shrink-0 max-lg:mb-[-1px] max-lg:mt-0 max-lg:flex-row max-lg:justify-start max-lg:border-b max-lg:border-[var(--piece-border)] max-lg:px-5 max-lg:py-2 lg:rounded-lg">
					<NavButton icon="detail">作品詳情</NavButton>
					<NavButton icon="warn">舉報</NavButton>
				</nav>
			</aside>

			<section className="w-[1080px] max-xl:max-w-[calc(100%-16px-120px)] max-lg:mb-32 max-lg:w-full max-lg:max-w-none">
				<article className="piece-body mb-6 min-h-[calc(100vh-75px)] border border-[var(--piece-border)] bg-[var(--piece-content)] px-[60px] py-20 max-lg:px-5 max-lg:py-6 lg:rounded-2xl">
					<ArticleBox></ArticleBox>
				</article>

				<section className="piece-nav m-auto flex items-center justify-between gap-11 rounded-2xl border border-[var(--piece-border)] bg-[var(--piece-nav)] px-[60px] py-5 max-lg:fixed max-lg:bottom-[60px] max-lg:left-0 max-lg:right-0 max-lg:rounded-none max-lg:px-5 max-lg:py-3">
					<button className="px-32 text-[var(--piece-text)] hover:text-white active:text-white max-xl:px-10 max-md:px-0">
						上一章
					</button>
					<p
						className={
							"flex items-center justify-center border-l border-r border-[var(--piece-border)] max-lg:px-4 max-md:text-xs " +
							" before:text-[var(--piece-text)] before:content-['點擊左右鍵_←_→_進行章節切換'] max-lg:before:content-['點擊畫面中央可展開收合工具列']"
						}
					></p>
					<button className="px-32 text-[var(--piece-text)] hover:text-white active:text-white max-xl:px-10 max-md:px-0">
						下一章
					</button>
				</section>
			</section>

			<aside className="sticky top-0 block w-[60px] max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:m-auto max-lg:w-full">
				<nav className="piece-aside m-auto mt-[300px] flex flex-col items-center justify-center gap-4 rounded-lg bg-[var(--piece-aside)] py-4 *:flex-shrink-0 max-lg:mt-0 max-lg:flex-row max-lg:justify-around max-lg:rounded-none max-lg:py-2">
					<NavButton icon="cata">目錄</NavButton>
					<NavButton icon="heart">收藏</NavButton>
					<NavButton icon="moon">夜間</NavButton>
					<NavButton icon="setting" onClick={() => setIsSettingBox(true)}>
						設定
					</NavButton>
					<div className="h-[1px] w-11 bg-ash-350 max-lg:hidden"></div>
					<button
						className={
							"flex flex-col items-center justify-center max-lg:hidden"
						}
					>
						<i className="i-arrow5-up -mt-1 block text-2xl text-primary-300"></i>
						<p className="-mt-1 mb-1 text-xs text-primary-300">TOP</p>
					</button>
				</nav>
			</aside>

			<SettingBox />
		</>
	);
}
