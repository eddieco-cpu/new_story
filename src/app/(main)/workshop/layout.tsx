import type { Metadata } from "next";

import Link from "next/link";
import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
	title: "讀創故事 workshop",
	description: "workshop",
};

const navItems = [
	{
		id: 1,
		title: "我的作品",
		link: "",
	},
	{
		id: 2,
		title: "作家資料",
		link: "",
	},
	{
		id: 3,
		title: "讀者留言",
		link: "",
	},
	{
		id: 1,
		title: "收入總覽",
		link: "",
	},
	{
		id: 2,
		title: "創作入門",
		link: "",
	},
	{
		id: 3,
		title: "創作條款",
		link: "",
	},
];

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<section className="py-5">
				<Breadcrumb></Breadcrumb>
			</section>
			<section className="grid grid-cols-[auto_1fr] gap-8 px-6">
				<div>
					<nav className="grid w-[180px] grid-cols-1 overflow-hidden rounded-2xl bg-white">
						{navItems.map((item) => (
							<Link
								key={item.id}
								href={item.link}
								className="flex items-center justify-center py-4"
							>
								{item.title}
							</Link>
						))}
					</nav>
				</div>
				<div className="min-h-[65vh] rounded-lg bg-white">{children}</div>
			</section>
		</>
	);
}
