import type { Metadata } from "next";
import { UiMain } from "@/components/UI";

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
			<header className="h-[75px] bg-[rgba(229,208,193,0.5)]">
				<p className="m-auto max-w-[1024px] py-4">言情 / 文章</p>
			</header>
			<UiMain>{children}</UiMain>
		</>
	);
}
