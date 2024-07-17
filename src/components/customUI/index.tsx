import Link from "next/link";
import React, { ReactNode } from "react";

const env = process.env.NODE_ENV;

type UiTitleProps = {
	children: ReactNode;
	className?: string;
	titleLink?: string;
};

type UiSectionProps = {
	children: ReactNode;
	className?: string;
	titleChildren?: ReactNode;
	titleLink?: string;
};

type UiMoreLinkProps = {
	children?: ReactNode;
	className?: string;
	href: string;
};

type UiMainProps = {
	children?: ReactNode;
	className?: string;
};

export const UiMain: React.FC<UiMainProps> = ({ children, className }) => {
	return (
		<main
			className={
				"m-auto min-h-[calc(100vh-270px)] max-w-[var(--container-width)] pb-8 max-md:max-w-none " +
				` ${env !== "production" ? " ring-1" : ""} ${className || ""}`
			}
		>
			{children}
		</main>
	);
};

export const UiTitle: React.FC<UiTitleProps> = ({
	children,
	className,
	titleLink,
}) => {
	return (
		<div className={`title-base ${className || ""}`}>
			<h2>{children}</h2>
			{titleLink && <UiMoreLink href={titleLink} />}
		</div>
	);
};

export const UiSection: React.FC<UiSectionProps> = ({
	children,
	className,
	titleChildren,
	titleLink,
}) => {
	return (
		<section className={`ui-section-base ${className || ""}`}>
			{titleChildren && (
				<UiTitle titleLink={titleLink} className="mb-4">
					{titleChildren}
				</UiTitle>
			)}
			{children}
		</section>
	);
};

export const UiMoreLink: React.FC<UiMoreLinkProps> = ({
	children,
	className,
	href,
}) => {
	return (
		<Link href={href} className={`more-link-base ${className || ""}`}>
			{children ? children : "更多"}
		</Link>
	);
};
