"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChildLink({
	children,
	link,
	className,
}: {
	children: React.ReactNode;
	link: string;
	className?: string;
}) {
	//
	const router = useRouter();

	const doLink = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(link);
	};

	//
	return (
		<span
			className={className ? `${className}` : ""}
			onClick={(e) => doLink(e)}
		>
			{children}
		</span>
	);
}
