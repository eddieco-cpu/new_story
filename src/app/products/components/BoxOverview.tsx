import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

import randomPicture from "@utils/randomPicture";
import randomText from "@utils/randomText";

import { UiButton, UiTag } from "@/components/UI/client";

//
const productData = {
	id: 1,
	title: randomText(3, 20),
	author: randomText(3, 20),
	picture: randomPicture(),
	content: randomText(20, 100),
	contentNumber: Math.floor(Math.random() * 10000),
	viewedNumber: Math.floor(Math.random() * 10000),
	likedNumber: Math.floor(Math.random() * 100),
	updatedValue: randomText(3, 20),
	updatedTime: "2024-03-29",
	tags: Array.from({ length: 6 }, (_, i) => i + 1).map((i) => ({
		id: new Date().getTime() + i,
		name: randomText(3, 10),
		link: "",
	})),
};

export default function Page() {
	return (
		<section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-5 max-md:gap-x-2 max-md:gap-y-4">
			{/* - */}
			<picture className="pic-base book-base row-span-2 aspect-[286/375] w-[286px] max-lg:row-span-1 max-lg:w-[150px] max-md:w-[120px]">
				<img src={productData.picture} alt="" />
			</picture>

			{/* - */}
			<article className="flex w-full flex-col items-start justify-start gap-4 max-md:gap-3">
				{/* --- */}
				<section className="grid grid-flow-col gap-2">
					<span className="mt-1 block h-7 w-7 rounded-md bg-secondary-500 text-center leading-7 text-white">
						限
					</span>
					<h3 className="line-clamp-2 h-16 text-2xl font-normal text-ash-900 max-md:h-14 max-md:text-xl">
						{productData.title +
							productData.title +
							productData.title +
							productData.title}
					</h3>
				</section>

				{/* --- */}
				<div className="overflow-hidden max-md:h-14 max-md:overflow-auto max-md:scrollbar-hide">
					<div className="flex items-center justify-start gap-2 max-md:flex-wrap max-md:content-start max-md:gap-y-[5px]">
						<UiTag
							el="span"
							className="border-secondary-450 text-secondary-450"
						>
							簽約
						</UiTag>
						<UiTag el="span" className="border-prompt-info text-prompt-info">
							連載中
						</UiTag>

						<UiTag
							el="nestedLink"
							link="#"
							className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
						>
							愛情言情
						</UiTag>
						<UiTag
							el="nestedLink"
							link="#"
							className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
						>
							愛情言情
						</UiTag>
						<UiTag
							el="nestedLink"
							link="#"
							className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
						>
							愛情言情
						</UiTag>
					</div>
				</div>

				{/* --- */}
				<p className="line-clamp-1 text-base font-normal text-primary-200 max-md:text-sm">
					<span className="text-inherit">{productData.author}</span>
				</p>
			</article>

			{/* - */}
			<div className="flex flex-col items-stretch justify-start gap-6 max-lg:col-span-2 max-md:gap-2">
				{/* --- */}
				<div className="flex items-center justify-start gap-3 max-md:mb-2 max-md:justify-between">
					<p>
						<b className="text-[22px]">{productData.contentNumber}</b>
						<span className="pl-1 text-ash-600">萬字</span>
					</p>
					<div className="h-5 w-[1px] bg-ash-500"></div>
					<p>
						<b className="text-[22px]">{productData.viewedNumber}</b>
						<span className="pl-1 text-ash-600">瀏覽數</span>
					</p>
					<div className="h-5 w-[1px] bg-ash-500"></div>
					<p>
						<i className="i-heart-2 text-xl text-accent-250"></i>
						<b className="text-[22px]">{productData.likedNumber}</b>
					</p>
				</div>

				{/* --- */}
				<p className="line-clamp-1 flex items-center justify-start gap-1">
					<span className="flex-shrink-0 text-sm text-ash-600">更新至</span>
					<b className="line-clamp-1 text-sm text-primary-200">
						{productData.updatedValue +
							productData.updatedValue +
							productData.updatedValue}
					</b>
					<time className="flex-shrink-0 text-sm text-ash-600">
						{productData.updatedTime}
					</time>
				</p>

				{/* --- */}
				<div
					className="flex items-center justify-start gap-4 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:z-[9] max-md:w-full max-md:bg-white max-md:px-5 max-md:py-4 max-md:shadow-2xl"
					style={
						{
							"--tw-shadow": "0 0 25px 0 rgba(0,0,0,0.2)",
						} as CSSProperties
					}
				>
					<UiButton
						variant="primary"
						className="m-0 h-[38px] flex-1 max-md:order-4"
					>
						開始閱讀
					</UiButton>
					<UiButton
						variant="primary"
						className="m-0 h-[38px] flex-1 max-md:order-3"
					>
						全本購買
					</UiButton>
					<UiButton
						variant="secondary"
						className="m-0 flex h-[38px] flex-1 items-center justify-center gap-2 max-md:order-1 max-md:max-w-12"
					>
						<i className="i-heart-empty text-inherit"></i>
						<span className="text-inherit max-md:hidden">收藏</span>
					</UiButton>
					<UiButton
						variant="secondary"
						className="m-0 flex h-[38px] flex-1 items-center justify-center gap-2 max-md:order-2 max-md:max-w-12"
					>
						<i className="i-heart-empty text-inherit"></i>
						<span className="text-inherit max-md:hidden">分享</span>
					</UiButton>
				</div>

				{/* --- */}
				<div className="flex flex-wrap content-start items-start justify-start gap-x-3 gap-y-[2px] pl-2">
					{productData.tags.map((tag) => (
						<Link
							href={tag.link}
							className="text-sm text-ash-600 hover:text-ash-900"
							key={tag.id}
						>
							<b className="text-inherit">#</b>
							<span className="text-inherit">{tag.name}</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
