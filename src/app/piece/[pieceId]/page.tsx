import Image from "next/image";

import { UiMain } from "@/components/customUI";

import PieceProvider from "@contexts/pieceContext";
import Wrapper from "../Components/Wrapper";

import { unFetchedPieceBase64 } from "@/lib/data";

import "@/styles/piece.scss";

// export async function fetchDataWithCookieInServer(
// 	url: string,
// 	cookie: string
// ): Promise<any> {
// 	try {
// 		const response = await fetch(url, {
// 			method: "GET", // 或是 'POST'
// 			// headers: {
// 			// 	"Content-Type": "application/json",
// 			// 	Cookie: cookie,
// 			// },
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}

// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		console.error("Error fetching data: ", error);
// 		return null;
// 	}
// }

export default async function Page({
	params: { pieceId },
}: {
	params: { pieceId: string };
}) {
	//
	let pieceBase64 = null;
	try {
		//https://story.udn.com/dcstore/ProtectedContent?id=79511020
		// pieceBase64 = await fetchDataWithCookieInServer(
		// 	"https://story.udn.com/dcstore/ProtectedContent?id=" + pieceId,
		// 	""
		// );
		//
		//const response = await fetch("https://health.udn.com/api/foodlist");

		const res = await fetch(
			`https://story.udn.com/dcstore/ProtectedContent?id=${pieceId}`
		);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const text = await res.text(); //txt, not json
		//console.log("Response Text: \n", text); // 查看返回的文本

		if (!text.trim().length) throw new Error("fetch text error");

		pieceBase64 = text;
		//console.log("pieceBase64 \n", pieceBase64);

		//
		if (!pieceBase64) throw new Error("fetch pieceBase64 error");
	} catch (error) {
		console.log("error \n", error);

		//
		pieceBase64 = unFetchedPieceBase64;
	}

	return (
		<>
			<header className="piece_header bg-[var(--piece-nav,--default-nav)] py-4">
				<nav className="mx-auto flex h-11 max-w-[1080px] items-center justify-start gap-2 max-lg:px-5">
					<a href="https://udn.com/news/index" className="logo-udn">
						<Image
							src="/images/reading-logo.svg"
							alt="聯合新聞網"
							width={43}
							height={32}
						/>
					</a>
					<a className="text-[var(--piece-text)]">言情 / 文章</a>
				</nav>
			</header>
			<section className="piece_main bg-[var(--piece-body,--default-body)] py-4 max-lg:pt-0">
				<UiMain className="flex items-start justify-center gap-[18px] *:flex-shrink-0 max-xl:gap-2 max-lg:flex-col max-lg:gap-0">
					<PieceProvider>
						<Wrapper pieceBase64={pieceBase64 as string}></Wrapper>
					</PieceProvider>
				</UiMain>
			</section>
		</>
	);
}