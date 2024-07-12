"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NestedLink({
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

	const navigateToLink = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(link);
	};

	//
	return (
		<span
			className={className ? `${className}` : ""}
			onClick={(e) => navigateToLink(e)}
		>
			{children}
		</span>
	);
}
