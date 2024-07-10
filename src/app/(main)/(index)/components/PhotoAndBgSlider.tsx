"use client";

import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Options as SplideOptions } from "@splidejs/splide";

import { PhotoSlider } from "@/types";

import "@splidejs/react-splide/css";
import "@styles/slider.scss";

const defaultBg = "rgb(248, 244, 241)"; //--landscape-300-rgb

function PhotoAndBgSlider({
	photoSliders,
}: {
	photoSliders: (PhotoSlider & { bg?: string; theme?: string })[];
}) {
	//
	const splideRef = useRef(null);

	const options: SplideOptions = {
		rewind: true,
		gap: "0rem",
		type: "loop",
		autoplay: true,
		interval: 6000,
		speed: 700,
		perPage: 1,
	};

	//
	useEffect(() => {
		//
		document.documentElement.style.setProperty(
			"--home-slide-bg",
			photoSliders[0].bg || defaultBg
		);

		// @ts-ignore
		const splide = splideRef.current?.splide;
		if (!splide) return;

		//
		//splide.on("active" ...)	// too late
		splide.on(
			"move",
			(newIndex: number, prevIndex: number, destIndex: number) => {
				console.log("Move");
				console.log(newIndex, prevIndex, destIndex);

				//
				const bg = photoSliders[newIndex]?.bg || defaultBg;
				const headerDarkTheme = photoSliders[newIndex]?.theme === "dark";

				document.documentElement.style.setProperty("--home-slide-bg", bg);
				if (headerDarkTheme) {
					document.documentElement.setAttribute("data-header-theme", "dark");
				} else {
					document.documentElement.removeAttribute("data-header-theme");
				}
			}
		);

		//
		return () => {
			console.log("Slide bye bye");
			document.documentElement.style.setProperty("--home-slide-bg", defaultBg);
			document.documentElement.removeAttribute("data-header-theme");
		};
	}, []);

	return (
		<>
			<Splide
				options={options}
				hasTrack={false}
				className="slider-bg-wrapper relative"
				// @ts-ignore
				ref={splideRef}
			>
				<SplideTrack>
					{photoSliders.map((photo, index) => (
						<SplideSlide key={index}>
							{/* 1280/330, 375/313 */}
							{/* 1280/405, 375/313 */}
							<div className="slider-bg-container aspect-[1280/405] w-full max-md:aspect-[375/313]">
								<picture className="block aspect-[1280/405] w-full overflow-hidden max-md:aspect-[375/313]">
									<img
										src={photo.src}
										alt={`${photo.alt}`}
										className="block h-full w-full object-cover object-center"
									/>
								</picture>
							</div>
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

export default PhotoAndBgSlider;
