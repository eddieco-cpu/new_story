"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode, ComponentPropsWithoutRef } from "react";

import { UiButton } from "@/components/customUI/client";

export default function Drawer({
	isDrawer,
	setIsDrawer,
}: {
	isDrawer: boolean;
	setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div
			className={
				"fixed left-0 top-0 z-20 h-full w-full overflow-hidden bg-[rgba(0,0,0,0.6)] transition-opacity duration-500 md:hidden " +
				(isDrawer ? " opacity-100" : " pointer-events-none opacity-0 delay-300")
			}
			style={{ "--top-h": "60px" } as React.CSSProperties}
			onClick={() => setIsDrawer(false)}
		>
			<section
				className={
					"absolute left-0 top-0 h-full w-80 bg-white transition-transform " +
					(isDrawer ? "translate-x-0 delay-300" : "-translate-x-full")
				}
			>
				<div className="flex h-[var(--top-h)] items-center justify-between px-5 py-4">
					<p className="flex items-center justify-start gap-[1px]">
						<a href="https://udn.com/news/index">
							<Image
								src="/images/reading-logo.svg"
								alt="聯合新聞網"
								width={34.68}
								height={26}
							/>
						</a>
						<a href="https://reading.udn.com/read/index">
							<Image
								src="/images/reading-brand.svg"
								alt="琅琅悅讀"
								width={92.36}
								height={22.66}
							/>
						</a>
					</p>
					<i
						className="i-close text-xl text-ash-600"
						onClick={() => setIsDrawer(false)}
					></i>
				</div>
				<aside className="relative block h-[calc(100%-var(--top-h))]">
					<div
						className="absolute left-0 top-0 h-5 w-full"
						style={{
							background: "linear-gradient(to bottom, white 10%, transparent)",
						}}
					></div>
					<div
						className="absolute bottom-0 left-0 h-10 w-full"
						style={{
							background: "linear-gradient(to top, white 30%, transparent)",
						}}
					></div>
					<section className="h-full overflow-auto py-4 scrollbar-hide">
						<ul className="grid gap-4 px-5">
							<li>
								<Link
									href="/"
									className="flex items-center justify-start gap-2"
								>
									<Image
										src="/images/icons/star.svg"
										alt="Star Icon"
										width={24}
										height={24}
									/>
									<span className="text-lg font-medium">推薦</span>
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="flex items-center justify-start gap-2"
								>
									<Image
										src="/images/icons/cate.svg"
										alt="cate"
										width={24}
										height={24}
									/>
									<span className="text-lg font-medium">全站分類</span>
								</Link>
							</li>
							<li>
								<nav className="grid grid-cols-2 gap-x-6 gap-y-4">
									<UiButton className="w-full">琅琅原創</UiButton>
									<UiButton className="w-full">言情</UiButton>
									<UiButton className="w-full">輕小說</UiButton>
									<UiButton className="w-full">玄幻</UiButton>
									<UiButton className="w-full">懸疑</UiButton>
									<UiButton className="w-full">琅琅原創</UiButton>
									<UiButton className="w-full">言情</UiButton>
									<UiButton className="w-full">輕小說</UiButton>
									<UiButton className="w-full">玄幻</UiButton>
									<UiButton className="w-full">懸疑</UiButton>
									<UiButton className="w-full">言情</UiButton>
								</nav>
							</li>
							<li className="pt-2">
								<Link
									href="/"
									className="flex items-center justify-start gap-2"
								>
									<Image
										src="/images/icons/rank.svg"
										alt=""
										width={24}
										height={24}
									/>
									<span className="text-lg font-medium">排行榜</span>
								</Link>
							</li>
							<li className="pt-2">
								<Link
									href="/"
									className="flex items-center justify-start gap-2"
								>
									<Image
										src="/images/icons/light.svg"
										alt=""
										width={24}
										height={24}
									/>
									<span className="text-lg font-medium">成為創作家</span>
								</Link>
							</li>
							<li className="pt-2">
								<Link
									href="/"
									className="flex items-center justify-start gap-2"
								>
									<Image
										src="/images/icons/write.svg"
										alt=""
										width={24}
										height={24}
									/>
									<span className="text-lg font-medium">徵文活動</span>
								</Link>
							</li>
							<li className="pt-2">
								<Link
									href="/"
									className="flex items-center justify-start gap-2"
								>
									<Image
										src="/images/icons/smile.svg"
										alt=""
										width={24}
										height={24}
									/>
									<span className="text-lg font-medium">儲值點數</span>
								</Link>
							</li>
							<li className="mt-2 h-[1px] bg-ash-350"></li>
						</ul>
						<ul className="grid gap-6 px-5 py-6">
							<li>
								<p className="flex items-center justify-start gap-[1px]">
									<a href="https://udn.com/news/index">
										<Image
											src="/images/reading-logo.svg"
											alt="聯合新聞網"
											width={34.68}
											height={26}
										/>
									</a>
									<a href="https://reading.udn.com/read/index">
										<Image
											src="/images/reading-brand.svg"
											alt="琅琅悅讀"
											width={92.36}
											height={22.66}
										/>
									</a>
								</p>
							</li>
							<li>
								<p className="flex items-center justify-start gap-[1px]">
									<a href="https://udn.com/news/index">
										<Image
											src="/images/reading-logo.svg"
											alt="聯合新聞網"
											width={34.68}
											height={26}
										/>
									</a>
									<a href="https://reading.udn.com/read/index">
										<Image
											src="/images/reading-brand.svg"
											alt="琅琅悅讀"
											width={92.36}
											height={22.66}
										/>
									</a>
								</p>
							</li>
						</ul>
						<div className="px-5 pb-6 pt-3">
							<p className="mb-2 text-lg tracking-[5px] text-ash-850">
								主題徵文
							</p>
							<div className="pic-base aspect-[30/25] rounded-[3px]">
								<img
									src="https://uc.udn.com.tw/photo/2019/06/11/99/6418904.jpg"
									alt=""
								/>
							</div>
						</div>
					</section>
				</aside>
			</section>
		</div>
	);
}
