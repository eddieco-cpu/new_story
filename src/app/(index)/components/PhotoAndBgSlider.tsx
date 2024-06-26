"use client";

import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Options as SplideOptions } from "@splidejs/splide";

import { PhotoSlider } from "@/types";

import "@splidejs/react-splide/css";
import "@styles/slider.scss";

import "@styles/home.scss";

function SplideComponent({
	photoSliders,
}: {
	photoSliders: (PhotoSlider & { bg?: string })[];
}) {
	//
	const options: SplideOptions = {
		rewind: true,
		gap: "1rem",
		type: "loop",
		autoplay: true,
		interval: 6000,
		speed: 700,
		perPage: 1,
	};

	return (
		<>
			<Splide options={options} hasTrack={false} className="relative">
				<SplideTrack>
					{photoSliders.map((photo, index) => (
						<SplideSlide key={index}>
							{/* 1280/330, 375/313 */}
							{/* 1280/405, 375/313 */}
							<picture className="slider-bg-container block aspect-[1280/405] w-full overflow-hidden max-md:aspect-[375/313]">
								<img
									src={photo.src}
									alt={`${photo.alt}`}
									className="block h-full w-full object-cover object-center"
								/>
							</picture>
						</SplideSlide>
					))}
				</SplideTrack>

				<div className="splide__arrows">
					<button className="splide__arrow splide__arrow--prev tag-center">
						<i className="i-arrow7-left"></i>
					</button>
					<button className="splide__arrow splide__arrow--next tag-center">
						<i className="i-arrow7-right"></i>
					</button>
				</div>
			</Splide>
		</>
	);
}

export default SplideComponent;
