"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Classification18Popup() {
	//
	const router = useRouter();
	const [isPopup, setIsPopup] = useState(false);

	useEffect(() => {
		const isAdultCheckViaSelf =
			sessionStorage?.getItem("is-adult-check-via-self") === "checked"
				? true
				: false;
		setIsPopup(!isAdultCheckViaSelf);
	}, []);

	const turnOffPopup = () => {
		sessionStorage.setItem("is-adult-check-via-self", "checked");
		setIsPopup(false);
	};

	//
	if (!isPopup) {
		return null;
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 z-[20] bg-[rgba(0,0,0,0.85)] backdrop-blur">
			<section className="absolute bottom-0 left-0 right-0 top-0 m-auto h-fit w-fit">
				<ul className="flex items-center justify-center gap-x-4 gap-y-8 max-md:mb-5 max-md:flex-col">
					<li
						onClick={() => router.back()}
						className="max-md:bg-center-bottom inline-block h-[133px] w-[231px] bg-[url(https://udn.com/static/img/misc/18-failed.svg)] bg-cover bg-center bg-no-repeat max-md:h-[65px]"
					></li>
					<li
						onClick={turnOffPopup}
						className="max-md:bg-center-bottom inline-block h-[133px] w-[231px] bg-[url(https://udn.com/static/img/misc/18-passed.svg)] bg-cover bg-center bg-no-repeat max-md:h-[65px]"
					></li>
				</ul>
				<picture className="m-auto block w-[95%] max-w-[486px]">
					<img
						className="block w-full"
						src="https://udn.com/static/img/misc/18+.png"
						alt=""
					/>
				</picture>
			</section>
		</div>
	);
}
