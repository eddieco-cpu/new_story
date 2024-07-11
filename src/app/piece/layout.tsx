import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "讀創故事 piece",
	description: "piece",
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
