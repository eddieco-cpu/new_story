import React, { ComponentPropsWithoutRef } from "react";

type CrossProps = {
	className?: string;
} & ComponentPropsWithoutRef<"svg">;

export default function Cross({
	className,
	...props
}: CrossProps) {
	return (
		<svg
			width="20"
			height="19"
			viewBox="0 0 20 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={"cross_icon " + (className || "")}
			{...props}
		>
			<path
				d="M2.34082 1.8999L17.5408 17.0999M2.34082 17.0999L17.5408 1.8999"
				stroke="#222222"
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
