import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import { UiButton, UiTag } from "@/components/customUI/client";
import { Share } from "@/components/customUI/svg";

import { type FetchedProductDataType } from "@/types/product";
import { formatTimestampToDateString } from "@/lib/helper";

//
export default function BoxOverview({
	productData,
}: {
	productData: FetchedProductDataType;
}) {
	return (
		<section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-5 max-md:gap-x-2 max-md:gap-y-4">
			{/* - */}
			<picture className="pic-base book-base row-span-2 aspect-[286/375] w-[286px] max-lg:row-span-1 max-lg:w-[150px] max-md:w-[120px]">
				<img src={productData.imgcover} alt="" />
			</picture>

			{/* - */}
			<article className="flex w-full flex-col items-start justify-start gap-4 max-md:gap-3">
				{/* --- */}
				<section className="grid grid-flow-col gap-2">
					{productData.contentrating?.includes("限") && (
						<span className="mt-1 block h-7 w-7 rounded-md bg-secondary-500 text-center leading-7 text-white">
							限
						</span>
					)}
					<h3 className="line-clamp-2 h-16 text-2xl font-normal text-ash-900 max-md:h-14 max-md:text-xl">
						{productData.title}
					</h3>
				</section>

				{/* --- */}
				<div className="overflow-hidden max-md:h-14 max-md:overflow-auto max-md:scrollbar-hide">
					<div className="flex items-center justify-start gap-2 max-md:flex-wrap max-md:content-start max-md:gap-y-[5px]">
						{productData.writer_type === "C" && (
							<UiTag
								el="span"
								className="border-secondary-450 text-secondary-450"
							>
								簽約
							</UiTag>
						)}
						<UiTag el="span" className="border-prompt-info text-prompt-info">
							{productData.status_status === "Y" ? "已完結" : "連載中"}
						</UiTag>
						{productData.category.map((category) => (
							<UiTag
								el="nestedLink"
								link={"/cate/" + category.id}
								className="border-[rgb(222,131,92)] text-[rgb(222,131,92)] hover:border-accent-300 hover:text-accent-300"
								key={category.id}
							>
								{category.name}
							</UiTag>
						))}
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
						{Number(productData.words) > 10000 ? (
							<>
								<b className="text-[22px] font-normal">
									{Math.floor(Number(productData.words) / 10000)}
								</b>
								<span className="pl-1 text-ash-600">萬字</span>
							</>
						) : (
							<>
								<b className="text-[22px] font-normal">{productData.words}</b>
								<span className="pl-1 text-ash-600">字</span>
							</>
						)}
					</p>
					<div className="h-5 w-[1px] bg-ash-500"></div>
					<p>
						<b className="text-[22px] font-normal">{productData.view}</b>
						<span className="pl-1 text-ash-600">瀏覽數</span>
					</p>
					<div className="h-5 w-[1px] bg-ash-500"></div>
					<p>
						<i className="i-heart-2 text-xl text-accent-250"></i>
						<b className="text-[22px] font-normal">{productData.collection}</b>
					</p>
				</div>

				{/* --- */}
				<p className="line-clamp-1 flex items-center justify-start gap-1">
					<span className="flex-shrink-0 text-sm text-ash-600">更新至</span>
					<Link
						className="line-clamp-1 text-sm text-primary-200"
						href={"/piece/" + productData.last_update_chapter_id}
					>
						{productData.last_update_chapter_name}
					</Link>
					<time className="flex-shrink-0 text-sm text-ash-600">
						{formatTimestampToDateString(
							productData.last_update_chapter_publishtime
						)}
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
						{/* <i className="i-heart-empty text-inherit"></i> */}
						<Share />
						<span className="text-inherit max-md:hidden">分享</span>
					</UiButton>
				</div>

				{/* --- */}
				{/* <div className="flex flex-wrap content-start items-start justify-start gap-x-3 gap-y-[2px] pl-2">
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
				</div> */}
			</div>
		</section>
	);
}
