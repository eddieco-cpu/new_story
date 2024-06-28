"use client";

import Link from "next/link";
import React, { ReactNode, ComponentPropsWithoutRef } from "react";

type UiButtonProps = {
	children: ReactNode;
	className?: string;
	variant?: "primary" | "secondary" | "tertiary";
} & ComponentPropsWithoutRef<"button">;

export const UiButton: React.FC<UiButtonProps> = ({
	children,
	className,
	variant,
	...props
}) => {
	return (
		<button
			className={
				"btn-base " + `${variant ? `${variant}-btn-base ` : ""}` + className
			}
			{...props}
		>
			{children}
		</button>
	);
};
