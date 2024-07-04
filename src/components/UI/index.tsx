import Link from "next/link";
import React, { ReactNode, ComponentPropsWithoutRef } from "react";

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
