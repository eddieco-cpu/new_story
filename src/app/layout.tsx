import type { Metadata } from "next";
import { Inter, Noto_Sans_TC, Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "../styles/globals.scss";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const noto_sans_tc = Noto_Sans_TC({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-noto-sans-tc",
	display: "swap",
});

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "900"],
	variable: "--font-roboto",
	display: "swap",
});

export const metadata: Metadata = {
	title: "讀創故事",
	description:
		"讀創故事匯聚文學、小說、人文、知識、生活、圖文…等多元的優質創作內容，我們致力於提供作者最完善的創作舞台、給予讀者最豐富的精神食糧。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${roboto.variable} ${noto_sans_tc.variable}`}
		>
			<head>
				<link
					rel="icon"
					href="https://udn.com/static/img/icons/icon-128x128.png"
					sizes="128x128"
				></link>
				<link
					rel="icon"
					href="https://udn.com/static/img/icons/icon-192x192.png"
					sizes="192x192"
				></link>
				<link
					rel="icon"
					type="image/x-icon"
					href="https://udn.com/static/img/favicon.ico"
				></link>
				<link
					href="https://s.udn.com.tw/static/font-icons/css/fontello.css"
					rel="stylesheet"
					type="text/css"
				></link>
				<link
					href="https://s.udn.com.tw/static/font-icons/css/animation.css"
					rel="stylesheet"
					type="text/css"
				/>
			</head>
			<body className="bg-landscape-300">
				<Header />
				<main className="m-auto min-h-screen max-w-[var(--container-width)] ring-1 max-md:max-w-none">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
