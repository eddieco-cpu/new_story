"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, ComponentPropsWithoutRef } from "react";

//
type UiButtonProps = {
	children: ReactNode;
	className?: string;
	variant?: "primary" | "secondary" | "tertiary";
} & ComponentPropsWithoutRef<"button">;

//
type UiTagSpanProps = {
	el: "span";
	children: ReactNode;
	className?: string;
} & ComponentPropsWithoutRef<"span">;

type UiTagAnchorProps = {
	el: "link";
	children: ReactNode;
	className?: string;
	href: string;
} & ComponentPropsWithoutRef<"a">;

type UiTagButtonProps = {
	el: "button";
	children: ReactNode;
	className?: string;
} & ComponentPropsWithoutRef<"button">;

type UiTagNestedLinkProps = {
	el: "nestedLink";
	children: ReactNode;
	className?: string;
	link: string;
} & ComponentPropsWithoutRef<"span">;

type UiTagProps =
	| UiTagSpanProps
	| UiTagAnchorProps
	| UiTagButtonProps
	| UiTagNestedLinkProps;

//
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

export const UiTag: React.FC<UiTagProps> = (props) => {
	//
	const router = useRouter();

	//
	const classNameString = `shrink-0 rounded border px-[6px] py-[3px] text-xs font-normal leading-none `;
	const classNameInteractString = `transition-all hover:bg-[rgba(255,255,255,1)] active:bg-landscape-400 cursor-pointer `;

	if (props.el === "span") {
		const { el, children, className, ...rest } = props;
		return (
			<span className={classNameString + className} {...rest}>
				{children}
			</span>
		);
	}

	if (props.el === "link") {
		const { el, children, className, href, ...rest } = props;
		return (
			<Link href={href}>
				<a
					className={
						classNameString + classNameInteractString + " " + className
					}
					{...rest}
				>
					{children}
				</a>
			</Link>
		);
	}

	if (props.el === "button") {
		const { el, children, className, ...rest } = props;
		return (
			<button
				className={classNameString + classNameInteractString + " " + className}
				{...rest}
			>
				{children}
			</button>
		);
	}

	if (props.el === "nestedLink") {
		const { el, children, className, link, ...rest } = props;

		const navigateToLink = (e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			router.push(link);
		};

		return (
			<span
				className={classNameString + classNameInteractString + " " + className}
				{...rest}
				onClick={(e) => navigateToLink(e)}
			>
				{children}
			</span>
		);
	}

	return null;
};
