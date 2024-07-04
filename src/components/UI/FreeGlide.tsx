"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";

function FreeGlide({
	containerClassName,
	className,
	children,
	disableInMoblie,
}: {
	containerClassName?: string;
	className?: string;
	children?: React.ReactNode;
	disableInMoblie?: boolean;
}) {
	const [emblaRef] = useEmblaCarousel({ dragFree: true });

	return (
		<div
			className={`overflow-hidden ${containerClassName ? containerClassName : ""}`}
			ref={emblaRef}
		>
			<div
				className={`free-glide-flex items-stretch ${disableInMoblie ? "max-md:!transform-none" : ""}`}
			>
				{children ? (
					<div className={`${className}`}>{children}</div>
				) : (
					<div
						className={`h-64 w-[1999px] flex-shrink-0`}
						style={{
							background: "linear-gradient(0.25turn, #3f87a6, pink, #f69d3c)",
						}}
					></div>
				)}
				<div className={`w-[1px] flex-shrink-0`}></div>
			</div>
		</div>
	);
}

export default FreeGlide;
