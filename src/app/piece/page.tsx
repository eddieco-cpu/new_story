import Image from "next/image";

import { UiMain } from "@/components/customUI";
import Wrapper from "./Components/Wrapper";

import "@/styles/piece.scss";

export default function Page() {
	return (
		<>
			<header className="piece_header bg-[var(--piece-nav,--default-nav)] py-4">
				<nav className="mx-auto flex h-11 max-w-[1080px] items-center justify-start gap-2 ring-1 max-lg:px-5">
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
					<Wrapper></Wrapper>
				</UiMain>
			</section>
		</>
	);
}
