import type { Metadata } from "next";
import Image from "next/image";

import { UiMain } from "@/components/UI";

import "@/styles/piece.scss";

export const metadata: Metadata = {
	title: "讀創故事 piece",
	description: "piece",
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header className="piece_header bg-[var(--piece-nav,orange)] py-4">
				<nav className="mx-auto flex h-11 max-w-[1080px] items-center justify-start gap-2 ring-1 max-lg:px-5">
					<a href="https://udn.com/news/index" className="logo-udn">
						<Image
							src="/images/reading-logo.svg"
							alt="聯合新聞網"
							width={43}
							height={32}
						/>
					</a>
					<a className="">言情 / 文章</a>
				</nav>
			</header>
			<section className="piece_main bg-[var(--piece-body,white)] py-4 max-lg:pt-0">
				<UiMain className="flex items-start justify-center gap-[18px] *:flex-shrink-0 max-xl:gap-2 max-lg:flex-col max-lg:gap-0">
					{children}
				</UiMain>
			</section>
		</>
	);
}
