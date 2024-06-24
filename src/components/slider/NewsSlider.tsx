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
		gap: "10rem",
		type: "loop",
		autoplay: true,
		interval: 5000,
		speed: 700,
		perPage: 1,
		arrows: false,
		pagination: false,
		height: "28px",

		breakpoints: {
			768: {
				height: "40px",
				gap: "8rem",
			},
		},
	};

	return (
		<article className="flex items-center justify-start gap-2 max-md:h-10">
			<span className="news-base flex h-[30px] w-[70px] flex-shrink-0 items-center justify-center bg-secondary-450 text-white max-md:hidden">
				News
			</span>
			<p className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary-450 max-md:flex">
				<i className="i-notification text-white"></i>
			</p>
			<div>
				<Splide options={options}>
					{newsArray.map((n, i) => (
						<SplideSlide key={i}>
							<p className="line-clamp-1 h-7 max-md:line-clamp-2 max-md:h-10">
								<Link
									href={n.link}
									className="text-lg text-ash-850 max-md:line-clamp-2 max-md:h-10 max-md:break-words max-md:text-sm max-md:leading-5"
								>
									{n.text}
								</Link>
							</p>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</article>
	);
}
