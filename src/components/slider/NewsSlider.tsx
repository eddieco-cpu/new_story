"use client";

import React from "react";
import Link from "next/link";

import { NewsType } from "@/types";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Options as SplideOptions } from "@splidejs/splide";

import "@splidejs/react-splide/css";
import "@styles/slider.scss";

export default function News({ newsArray }: { newsArray: NewsType[] }) {
	//
	const options: SplideOptions = {
		rewind: true,
		direction: "ttb",
		gap: "1rem",
		type: "loop",
		autoplay: true,
		interval: 6000,
		speed: 700,
		perPage: 1,
		arrows: false,
		pagination: false,
		height: "28px",
	};

	return (
		<article className="flex items-center justify-start gap-2">
			<span className="news-base block flex h-[30px] w-[70px] items-center justify-center bg-secondary-450 text-white">
				News
			</span>
			<div>
				<Splide options={options}>
					{newsArray.map((n, i) => (
						<SplideSlide key={i}>
							<p className="h-7 overflow-hidden text-lg text-ash-850">
								<Link href={n.link}>{n.text}</Link>
							</p>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</article>
	);
}
