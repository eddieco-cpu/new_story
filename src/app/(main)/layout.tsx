import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgreementOfRead from "@/components/AgreementOfRead";

import { UiMain } from "@/components/customUI";

export const metadata: Metadata = {
	title: "讀創故事 main site",
	description: "main site",
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<AgreementOfRead />
			<UiMain>{children}</UiMain>
			<Footer />
		</>
	);
}
