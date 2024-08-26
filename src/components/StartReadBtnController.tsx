"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { UiButton, UiTag } from "@/components/customUI/client";
import { isLoginWithinDay } from "@/lib/helper";
import {
	getData,
	SHOW_STORE_PRODUCT,
	SHOW_STORE_PRODUCT_CHAPTER,
} from "@/lib/api";

import { type FetchedProductDataType } from "@/types/product";
import { type ProductChaptersData } from "@/types/chapter";

import { useToast } from "@/components/ui/use-toast";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

export default function StartReadBtnController({
	id,
	className,
}: {
	id: string;
	className?: string;
}) {
	//
	const router = useRouter();
	const { toast } = useToast();

	//
	async function handleDirectToChapter() {
		//

		if (!isLoginWithinDay()) {
			await handleDirectToFirstChapter();
			return;
		}

		await handleDirectToLastReadChapter();
	}

	//
	async function handleDirectToLastReadChapter() {
		try {
			const res = await getData(BASE_PATH + SHOW_STORE_PRODUCT + `?id=${id}`);

			if (!res.data || res.data.status !== "200") {
				throw new Error("get lastChapter error");
			}

			const data = res.data as FetchedProductDataType;
			console.log("data: ", data);

			if (!data.last_reading_chapter_id) {
				await handleDirectToFirstChapter();
				return;
			}

			router.push(`/piece/${id}/${data.last_reading_chapter_id}`);

			//
		} catch (error) {
			console.log("set last update ChapterId fail");
			console.error(error);
			toast({
				description: "獲取資料失敗，請重新整理，或稍後再試。",
			});
		}
	}

	async function handleDirectToFirstChapter() {
		try {
			const res = await getData(
				BASE_PATH +
					SHOW_STORE_PRODUCT_CHAPTER +
					`?id=${id}&order_by=chapter&amount_per_page=1&page=1`
			);

			if (
				!res.data ||
				res.data.status !== "200" ||
				!res.data.list ||
				res.data.list.length === 0
			) {
				throw new Error("get firstChapter error");
			}

			const data = res.data as ProductChaptersData;
			router.push(`/piece/${id}/${data.list[0].chapter_id}`);
			//
		} catch (error) {
			console.log("set last update ChapterId fail");
			console.error(error);
			toast({
				description: "獲取資料失敗，請重新整理，或稍後再試。",
			});
		}
	}

	return (
		<UiButton
			variant="primary"
			className={cn("m-0 h-[38px] flex-1 max-md:order-4", className || "")}
			onClick={handleDirectToChapter}
		>
			開始閱讀
		</UiButton>
	);
}
