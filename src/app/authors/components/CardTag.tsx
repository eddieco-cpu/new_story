import React, { ReactNode, ComponentPropsWithoutRef } from "react";

type CardTagProps = {
	children: ReactNode;
	className?: string;
} & ComponentPropsWithoutRef<"span">;

const CardTag: React.FC<CardTagProps> = ({ children, className, ...props }) => {
	return (
		<span
			className={
				"shrink-0 rounded border px-[6px] py-[2px] text-xs font-normal leading-none " +
				className
			}
			{...props}
		>
			{children}
		</span>
	);
};

export default CardTag;
