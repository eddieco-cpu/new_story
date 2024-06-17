import Link from "next/link";
import React, { ReactNode } from 'react';

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

export const UiTitle: React.FC<UiTitleProps> = ({ children, className, titleLink }) => {
	return (
		<div className={`flex justify-between items-center ${className || ''}`}>
			<h2 className=' text-[22px] font-medium tracking-[2px]'>{children}</h2>
			{titleLink && 
			<Link href={titleLink} className=' tag-center border-extralight leading-none font-normal text-sm text-ash-600 py-1 px-2 rounded-xl'>更多</Link>}
		</div>
	);
};

export const UiSection: React.FC<UiSectionProps> = ({ children, className, titleChildren, titleLink }) => {
	return (
		<section className={`component_p-6 ${className || ''}`}>
			{titleChildren && <UiTitle titleLink={titleLink} className=" mb-4">{titleChildren}</UiTitle>}
			{children}
		</section>
	);
}