"use client";

import Image from "next/image";
import { useState } from "react";

import NavButton from "./NavButton";
import { Cross } from "@components/UI/svg";

export default function Wrapper() {
	//
	const [isSettingBox, setIsSettingBox] = useState(false);

	return (
		<>
			<aside className="sticky top-0 block w-[60px] max-lg:w-full">
				<nav className="m-auto mt-4 flex flex-col items-center justify-center gap-4 bg-white py-4 *:flex-shrink-0 max-lg:mt-0 max-lg:flex-row max-lg:justify-start max-lg:px-5 max-lg:py-2 lg:rounded-lg">
					<NavButton icon="detail">作品詳情</NavButton>
					<NavButton icon="warn">舉報</NavButton>
				</nav>
			</aside>

			<section className="w-[1080px] max-xl:max-w-[calc(100%-16px-120px)] max-lg:mb-32 max-lg:w-full max-lg:max-w-none">
				<article className="mb-6 min-h-[calc(200vh-75px)] border border-[var(--piece-border)] bg-[var(--piece-content)] px-[60px] py-20 lg:rounded-2xl"></article>

				<section className="m-auto flex items-center justify-between gap-11 rounded-2xl border border-[var(--piece-border)] bg-[var(--piece-nav,orange)] px-[60px] py-5 max-lg:fixed max-lg:bottom-[60px] max-lg:left-0 max-lg:right-0 max-lg:rounded-none max-lg:px-5 max-lg:py-3">
					<button className="px-32 hover:text-white active:text-white max-xl:px-10 max-md:px-0">
						上一章
					</button>
					<p
						className={
							"flex items-center justify-center border-l border-r border-[var(--piece-border)] max-lg:px-4 max-md:text-xs " +
							" before:content-['點擊左右鍵_←_→_進行章節切換'] max-lg:before:content-['點擊畫面中央可展開收合工具列']"
						}
					></p>
					<button className="px-32 hover:text-white active:text-white max-xl:px-10 max-md:px-0">
						下一章
					</button>
				</section>
			</section>

			<aside className="sticky top-0 m-auto block w-[60px] max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:w-full">
				<nav className="m-auto mt-[300px] flex flex-col items-center justify-center gap-4 rounded-lg bg-white py-4 *:flex-shrink-0 max-lg:mt-0 max-lg:flex-row max-lg:justify-around max-lg:rounded-none max-lg:py-2">
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

			{/* --- */}
			<div
				className={
					"fixed bottom-0 left-0 right-0 top-0 z-20 m-auto " +
					(isSettingBox
						? " pointer-events-auto scale-100 bg-[rgba(0,0,0,0.7)]"
						: " pointer-events-none scale-0 bg-transparent")
				}
				onClick={() => setIsSettingBox(false)}
			>
				{isSettingBox && (
					<div className="absolute bottom-0 left-0 right-0 top-0 m-auto aspect-[403/368] w-[403px] rounded-lg bg-white p-6" >
						<p className="flex justify-end">
							<Cross></Cross>
						</p>
						<div className="px-9 py-3">
							<p className="h-[60px] border-b border-ash-300 text-center text-2xl font-medium leading-[60px]">
								主題
							</p>
							<ul className="grid gap-6 py-4">
								<li className="grid grid-cols-[auto_1fr] gap-6">
									<p>字級</p>
									<div className="flex items-center justify-center rounded-lg border *:h-8 *:w-1/3">
										<button>A-</button>
										<p className="flex items-center justify-center border-l border-r border-ash-300 text-center">
											18
										</p>
										<button>A+</button>
									</div>
								</li>
								<li className="grid grid-cols-[auto_1fr] gap-6">
									<p>行高</p>
									<div className="flex items-center justify-center rounded-lg border *:h-8 *:w-1/3">
										<button>小</button>
										<button className="flex items-center justify-center border-l border-r border-ash-300 text-center">
											中
										</button>
										<button>大</button>
									</div>
								</li>
								<li className="grid grid-cols-[auto_1fr] gap-6">
									<p>主題</p>
									<p className="flex items-center justify-between">
										<b className="block aspect-square w-6 rounded-full ring-1"></b>
										<b className="block aspect-square w-6 rounded-full ring-1"></b>
										<b className="block aspect-square w-6 rounded-full ring-1"></b>
										<b className="block aspect-square w-6 rounded-full ring-1"></b>
										<b className="block aspect-square w-6 rounded-full ring-1"></b>
									</p>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
