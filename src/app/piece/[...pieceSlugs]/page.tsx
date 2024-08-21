import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { fetchDataWithCookieInServer } from "@/lib/api";
import { convertCookieObjArrayToString } from "@/lib/helper";

import { UiMain } from "@/components/customUI";

import PieceProvider from "@contexts/pieceContext";
import AgreementOfRead from "@/components/AgreementOfRead";
import Wrapper from "../Components/Wrapper";

import { unFetchedPieceBase64 } from "@/lib/data";

import {
	type CategoryType,
	type FetchedProductDataType,
} from "@/types/product";

import "@/styles/piece.scss";

//
export type Chapter = {
	point: string;
	title: string;
	order: string;
	publishtime: string;
	chapter_id: string;
	isfree: string;
	ver: string;
	right: string;
};
export type ProductChaptersData = {
	message: string;
	status: string;
	list: Chapter[];
};

export default async function Page({
	params: { pieceSlugs },
}: {
	params: { pieceSlugs: string[] };
}) {
	//
	const cookieStore = cookies();
	let um2 = cookieStore.get("um2");

	if (um2) um2 = { ...um2, value: encodeURIComponent(um2.value) };

	const cookieString = convertCookieObjArrayToString([um2]);

	//
	console.log("pieceSlugs: \n", pieceSlugs);
	if (pieceSlugs.length !== 2) {
		notFound();
		return null;
	}

	//
	const pid = pieceSlugs[0];
	const pieceId = pieceSlugs[1];

	//////
	var productData: null | FetchedProductDataType = null;
	try {
		productData = (await fetchDataWithCookieInServer(
			`https://story-onlinelab.udn.com/story3/ShowStoreProduct?id=${pid}`,
			cookieString
		)) as FetchedProductDataType;
		if (!productData)
			throw new Error("fetch productDataerror in products page");
	} catch (error) {
		console.log("error \n", error);
		notFound();
		return null;
	}
	console.log("productData: \n", productData);

	//////
	var productChaptersData: null | ProductChaptersData = null;
	try {
		productChaptersData = await fetchDataWithCookieInServer(
			`https://story-onlinelab.udn.com/story3/ShowStoreProductChapter?id=${pid}&order_by=chapter`,
			cookieString
		);
		if (!productChaptersData)
			throw new Error("fetch productChaptersData error in products page");
	} catch (error) {
		console.log("error \n", error);
		notFound();
		return null;
	}
	//console.log("productChaptersData: \n", productChaptersData);

	if (
		!productData ||
		!productChaptersData ||
		productData.status !== "200" ||
		productChaptersData.status !== "200"
	) {
		notFound();
		return null;
	}

	//
	var productChapters = productChaptersData.list;
	var pieceBase64Value = "";
	var productChapter = productChapters.find(
		(chapter) => chapter.chapter_id === pieceId
	);

	if (productChapter) {
		console.log("productChapter: \n", productChapter);
		try {
			const res = await fetch(
				`https://story.udn.com/dcstore/ProtectedContent?id=${pieceId}`
			);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const text = await res.text(); //txt, not json
			if (!text.trim().length) throw new Error("fetch text error");

			pieceBase64Value = text;
			//console.log("pieceBase64Value \n", pieceBase64Value);

			//
		} catch (error) {
			console.log("error \n", error);
			pieceBase64Value = unFetchedPieceBase64;
		}
	} else {
		pieceBase64Value = unFetchedPieceBase64;
	}

	return (
		<>
			<header className="piece_header bg-[var(--piece-nav,--default-nav)] py-4">
				<nav className="mx-auto flex h-11 max-w-[1080px] items-center justify-start gap-2 max-lg:px-5">
					<Link href="/" className="logo-udn">
						<Image
							src="/images/reading-logo.svg"
							alt="聯合新聞網"
							width={43}
							height={32}
						/>
					</Link>
					<p className="text-sm">
						{productData.category[0] && (
							<>
								<Link href={`/cate/${productData.category[0].id}`}>
									{productData.category[0].name}
								</Link>
								<span className="px-1">/</span>
							</>
						)}
						<Link href={`/products/${pid}`}>{productData.title}</Link>
						<span className="px-1">/</span>
						<span>{productChapter?.title || ""}</span>
					</p>
				</nav>
			</header>
			<AgreementOfRead />
			<section className="piece_main bg-[var(--piece-body,--default-body)] py-4 max-lg:pt-0">
				<UiMain className="flex items-start justify-center gap-[18px] *:flex-shrink-0 max-xl:gap-2 max-lg:flex-col max-lg:gap-0">
					<PieceProvider>
						<Wrapper
							pieceBase64={pieceBase64Value as string}
							productId={pid}
							is_collection={productData.is_collection}
							productChapter={productChapter as Chapter}
							productChapters={productChapters as Chapter[]}
							publish_article={productData.publish_article as string}
							status_status={productData.status_status as string}
							title={productData.title as string}
						></Wrapper>
					</PieceProvider>
				</UiMain>
			</section>
		</>
	);
}
